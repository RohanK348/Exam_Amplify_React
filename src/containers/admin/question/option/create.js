import React, {useState, useEffect} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

// import {useSetting} from '../../../provider/setting'
import {useStyles} from '../../../style/common'
import {useAsync} from '../../../../functions/utils'
import {create} from '../../../../api/option'

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
  const {refresh, questionId, isTrue} = props
  const [modalActive, setModalActive] = useState(false)
  const [description, setDescription] = useState('')
  const [pending, setPending] = useState(false)

  const handleClickOpen = () => {
    setDescription('')
    setModalActive(true)
    console.log(isTrue)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    if (description === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    console.log(isTrue)
    run(create({
      description: description,
      questionID: questionId,
      isTrue: isTrue,
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
      <button className={classes.button} style={{marginBottom: 10, float: 'right'}} variant="outlined" onClick={handleClickOpen}>Add Option</button>
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
        <DialogTitle id="form-dialog-title">Add Option</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please input data
          </DialogContentText>
          <div className={classes.label}>Description</div>
          <SunEditor
            // setContents="My contents"
            showToolbar={true}
            onChange={setDescription}
            setDefaultStyle="height: auto"
            setOptions={{
              buttonList: [
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "list",
                  "align",
                  "fontSize",
                  "formatBlock",
                  "table",
                  "image"
                ]
              ]
            }}
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
