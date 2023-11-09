import React, {useState} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
} from "@material-ui/core";
import { UnfoldMore } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

import {useImproveTemplate} from '../../../../../provider/improveTemplate'
import { useStyles } from '../../../../style/common'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};
const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const CreateDialog = (props) => {
  const customeClasses = useCustomStyles()
  const classes = useStyles();
  const [improveTemplate, dispatch] = useImproveTemplate()
  const {complexityTypes, brain, templateId, topics, more} = props
  const [modalActive, setModalActive] = useState(false)
  const [topic, setTopic] = useState(0)
  const [number, setNumber] = useState(0)
  const [complexity, setComplexity] = useState('')
  const [min, setMin] = useState(0)
  const [avg, setAvg] = useState(0)
  const [max, setMax] = useState(0)

  const handleClickOpen = () => {
    setTopic(0)
    setNumber(0)
    if (complexityTypes.length !== 0)
      setComplexity(complexityTypes[0].name)
    setMin(0)
    setAvg(0)
    setMax(0)
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    let msg = ''
    if (number === 0) {
      res = false
      msg = "Please input required fields";
    }
    if (min === 0 || min < 0 || min > 10) {
      res = false
      msg = "Please input 0 ~ 10 number for min";
    }
    if (avg === 0 || avg < 0 || avg > 10) {
      res = false
      msg = "Please input 0 ~ 10 number for avg";
    }
    if (max === 0 || max < 0 || max > 10) {
      res = false
      msg = "Please input 0 ~ 10 number for max";
    }
    if (!res)
      NotificationManager.warning(msg, 'Worning', 3000);
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    let tmp = {
      topicID: topics[topic].id,
      number,
      complexity,
      min,
      avg,
      max,
      brain,
      improveTemplateID: templateId,
    };
    const newTopics = [...improveTemplate?.newTopics, tmp]
    dispatch({ type: 'SET', name: 'newTopics', value: newTopics })
    const newTopic = {...tmp, topic: topics[topic]}
    if (brain === 'right') {
      const _topics = [...improveTemplate?.rightTopics, newTopic]
      dispatch({ type: 'SET', name: 'rightTopics', value: _topics })
    }
    else if (brain === 'left') {
      const _topics = [...improveTemplate?.leftTopics, newTopic]
      dispatch({ type: 'SET', name: 'leftTopics', value: _topics })
    }
    setModalActive(false)
  }

  return (
    <>
      <button className="bg-blue-800 px-4 py-2 rounded" onClick={handleClickOpen}>Add Topic</button>
      <Dialog 
        disableBackdropClick
        disableEscapeKeyDown
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title">Add Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please input data
          </DialogContentText>
          <div className={classes.label}>Topic</div>
          <div style={{display: 'flex'}}>
            <Select
              style={{width: '100%', textAlign: 'center', marginBottom: 10}}
              value={topic}
              label="Topic"
              onChange={(e) => setTopic(e.target.value)}
              MenuProps={MenuProps}
            >
              {topics.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <Tooltip title="More" placement="top-end">
              <IconButton aria-label="detail" onClick={() => more(brain)}>
                <UnfoldMore className={classes.icon} />
              </IconButton>
            </Tooltip>
          </div>
          <TextField
            margin="dense"
            id="number"
            label="Number"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            style={{marginTop: 20}}
          />
          <div>Complexity</div>
          <Select
            style={{width: '100%', textAlign: 'center', marginBottom: 10}}
            value={complexity}
            label="Complexity"
            onChange={(e) => setComplexity(e.target.value)}
            MenuProps={MenuProps}
          >
            {complexityTypes.map((item, index) => (
              <MenuItem key={index} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            id="min"
            label="Min"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            style={{marginTop: 20}}
          />
          <TextField
            margin="dense"
            id="avg"
            label="Avg"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={avg}
            onChange={(e) => setAvg(e.target.value)}
            style={{marginTop: 20}}
          />
          <TextField
            margin="dense"
            id="max"
            label="Max"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            style={{marginTop: 20}}
          />
        </DialogContent>
        <DialogActions>
          <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handleClose} color="primary">
            Cancel
          </button>
          <button className={classes.button} onClick={handleSave} color="primary">
            Save
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default CreateDialog
