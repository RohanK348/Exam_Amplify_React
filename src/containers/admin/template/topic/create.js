import React, {useState, useEffect} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
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

// import {useSetting} from '../../../../provider/setting'
import {useStyles} from '../../../style/common'
import {useAsync} from '../../../../functions/utils'
import {create} from '../../../../api/templateTopic'

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
  const {refresh, more, templateId, brain, topics} = props
  const [modalActive, setModalActive] = useState(false)
  const [topic, setTopic] = useState(0)
  const [pending, setPending] = useState(false)

  const handleClickOpen = () => {
    setTopic(0)
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const handleSave = () => {
    if (topics.length === 0)
      return
    run(create({
      name: topics[topic].name,
      topicID: topics[topic].id,
      brain: brain,
      templateID: templateId,
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
      <button className={classes.button} style={{marginBottom: 10, float: 'right'}} variant="outlined" onClick={handleClickOpen}>Add Topic</button>
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
              <IconButton aria-label="detail" onClick={more}>
                <UnfoldMore className={classes.icon} />
              </IconButton>
            </Tooltip>
          </div>
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
