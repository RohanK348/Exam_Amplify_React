import React, {useState, useEffect} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  IconButton,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Edit} from '@material-ui/icons'
import {NotificationManager} from 'react-notifications'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

// import {useSetting} from '../../../provider/setting'
import {useStyles} from '../../style/common'
import {useAsync} from '../../../functions/utils'
import {update} from '../../../api/question'
import {isNumeric} from '../../../functions/string'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
}
const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const EditDialog = (props) => {
  const {status, error, run} = useAsync({
    status: 'idle',
  })
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  // const [setting, dispatch] = useSetting()
  const {item, refresh, complexityTypes, optionTypes} = props
  const [modalActive, setModalActive] = useState(false)
  const [preInfor, setPreInfor] = useState('')
  const [description, setDescription] = useState('')
  const [solution, setSolution] = useState('')
  const [complexity, setComplexity] = useState('')
  const [time, setTime] = useState(0)
  const [mark, setMark] = useState(1)
  const [type, setType] = useState('')
  const [pending, setPending] = useState(false)

  const handleClickOpen = () => {
    setPreInfor(item.preInfor)
    setDescription(item.description)
    setSolution(item.solution)
    setTime(item.time)
    setMark(item.mark)
    setComplexity(item.complexity)
    setType(item.type)
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    if (description === '')
      res = false
    if (time === 0 || !isNumeric(time))
      res = false
    if (mark === 0 || !isNumeric(mark))
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    let tmp = {}
    tmp.id =item.id
    tmp.description = description
    tmp.solution = solution
    tmp.preInfor = preInfor
    tmp.complexity = complexity
    tmp.type = type
    tmp.time = time
    tmp.mark = mark
    run(update(tmp))
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
  }, [status, run])
  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <Edit className={classes.icon} />
      </IconButton>
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
        <DialogTitle id="form-dialog-title">Edit Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please input data
          </DialogContentText>
          <div className={classes.label}>Type</div>
          <Select
            style={{width: '100%', textAlign: 'center', marginBottom: 10}}
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
            MenuProps={MenuProps}
          >
            {optionTypes.map((item, index) => (
              <MenuItem key={index} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <div className={classes.label}>Description</div>
          <SunEditor
            showToolbar={true}
            defaultValue={description}
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
          <div className={classes.label}>Solution</div>
          <SunEditor
            showToolbar={true}
            defaultValue={solution}
            onChange={setSolution}
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
          <div className={classes.label}>Pre Info</div>
          <SunEditor
            showToolbar={true}
            defaultValue={preInfor}
            onChange={setPreInfor}
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
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label="Time"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="number"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{marginTop: 20}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="mark"
            label="Mark"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
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
export default EditDialog
