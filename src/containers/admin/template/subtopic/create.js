import React, {useState, useEffect} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {UnfoldMore} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

// import {useSetting} from '../../../../provider/setting'
import {useStyles} from '../../../style/common'
import {useAsync} from '../../../../functions/utils'
import {create} from '../../../../api/templateSubTopic'

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
  const {status, error, run} = useAsync({
    status: 'idle',
  })
  const customeClasses = useCustomStyles()
  const classes = useStyles();
  // const [setting, dispatch] = useSetting()
  const {refresh, more, templateTopicId, subTopics, complexityTypes} = props
  const [modalActive, setModalActive] = useState(false)
  const [subTopic, setSubTopic] = useState(0)
  const [complexity, setComplexity] = useState('')
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [pending, setPending] = useState(false)

  const handleClickOpen = () => {
    setSubTopic(0)
    setTotalQuestion(0)
    if (complexityTypes.length !== 0)
      setComplexity(complexityTypes[0].name)
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    if (totalQuestion === 0)
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    run(create({
      name: subTopics[subTopic].name,
      subTopicID: subTopics[subTopic].id,
      complexity: complexity,
      totalQuestion: totalQuestion,
      templateTopicID: templateTopicId,
    }))
    setPending(true)
  }

  useEffect(() => {
    if (status === 'resolved') {
      setPending(false)
      setModalActive(false) 
      refresh()
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
    <>
      <button className={classes.button} style={{marginBottom: 10, float: 'right'}} variant="outlined" onClick={handleClickOpen}>Add SubTopic</button>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Dialog 
        disableBackdropClick
        disableEscapeKeyDown
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title">Add SubTopic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please input data
          </DialogContentText>
          <div className={classes.label}>SubTopic</div>
          <div style={{display: 'flex'}}>
            <Select
              style={{width: '100%', textAlign: 'center', marginBottom: 10}}
              value={subTopic}
              label="SubTopic"
              onChange={(e) => setSubTopic(e.target.value)}
              MenuProps={MenuProps}
            >
              {subTopics.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <Tooltip title="More" placement="top-end">
              <IconButton aria-label="detail" onClick={more}>
                <UnfoldMore className={classes.icon} />
              </IconButton>
            </Tooltip>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="totalQuestion"
            label="Total Question"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="number"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={totalQuestion}
            onChange={(e) => setTotalQuestion(e.target.value)}
            style={{marginTop: 20}}
          />
          <div className={classes.label}>Complexity</div>
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
