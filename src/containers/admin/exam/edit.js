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
  FormControlLabel,
  Checkbox,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

// import {useSetting} from '../../../provider/setting'
import {useStyles} from '../../style/common'
import {useAsync} from '../../../functions/utils'
import {update} from '../../../api/exam'
import {getExamTypes, getExamMethods} from '../../../api/enum'

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
const EditDialog = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  // const [setting, dispatch] = useSetting()
  const {children, item, refresh} = props
  const [modalActive, setModalActive] = useState(false)
  const [name, setName] = useState('')
  const [totalTime, setTotalTime] = useState(0)
  const [rightBrainTime, setRightBrainTime] = useState(0)
  const [leftBrainTime, setLeftBrainTime] = useState(0)
  const [method, setMethod] = useState('')
  const [type, setType] = useState('')
  const [methods, setMethods] = useState([])
  const [types, setTypes] = useState([])
  const [displayType, setDisplayType] = useState('SEQUENTIAL')
  const displayTypes = ['SEQUENTIAL', 'BACK_ENABLED']
  const [camera, setCamera] = useState(false)
  const [cameraNumber, setCameraNumber] = useState(0)
  const [screen, setScreen] = useState(false)
  const [screenNumber, setScreenNumber] = useState(0)
  const [isRandom, setIsRandom] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [asyncState, setAsyncState] = useState('')
  const [pending, setPending] = useState(false)

  const handleClickOpen = () => {
    setName(item.name)
    setDisplayType(item.displayType)
    setTotalTime(item.totalTime)
    setRightBrainTime(item.rightBrainTime)
    setLeftBrainTime(item.leftBrainTime)
    setMethod(item.method)
    setType(item.type)
    setCamera(item.camera)
    setScreen(item.screen)
    setCameraNumber(item.cameraNumber)
    setScreenNumber(item.screenNumber)
    setIsRandom(item.isRandom)
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const changeRightBrainTime = (e) => {
    setRightBrainTime(e.target.value)
    setLeftBrainTime(totalTime-e.target.value)
  }
  const changeLeftBrainTime = (e) => {
    setLeftBrainTime(e.target.value)
    setRightBrainTime(totalTime-e.target.value)
  }
  const validate = () => {
    let res = true
    if (name === '')
      res = false
    if (totalTime <= 0)
      res = false
    if (method === 'MIX') {
      if (rightBrainTime <= 0)
        res = false
      if (leftBrainTime <= 0)
        res = false
    }
    if (type === 'SCHEDULED') {
      if (startDate === '' || endDate === '')
        res = false
    }
    if (type === 'PRE_DEFINED') {
      if (startDate === '')
        res = false
    }
    if (camera && cameraNumber === 0)
      res = false
    if (screen && screenNumber === 0)
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
    tmp.name = name
    tmp.totalTime = totalTime
    tmp.rightBrainTime = rightBrainTime
    tmp.leftBrainTime = leftBrainTime
    tmp.method = method
    tmp.type = type
    tmp.displayType = displayType
    tmp.camera = camera
    tmp.screen = screen
    tmp.cameraNumber = cameraNumber
    tmp.screenNumber = screenNumber
    tmp.isRandom = isRandom
    run(update(tmp))
    setPending(true)
    setAsyncState('update')
  }

  useEffect(() => {
    run(getExamTypes())
    setAsyncState('getExamTypes')
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'update') {
        setPending(false)
        setModalActive(false)
        refresh()
      }
      else if (asyncState === 'getExamTypes') {
        setTypes(data)
        if (data.length !== 0)
          setType(data[0].name)
        run(getExamMethods())
        setAsyncState('getExamMethods')
      }
      else if (asyncState === 'getExamMethods') {
        setMethods(data)
        if (data.length !== 0)
          setMethod(data[0].name)
        setAsyncState('')
      }
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status, run])
  return (
    <>
      <div style={{cursor: 'pointer'}} onClick={handleClickOpen}>
        {children}
      </div>
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
        <DialogTitle id="form-dialog-title">Edit Exam</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please input data
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{marginTop: 20}}
          />
          <TextField
            margin="dense"
            id="totalTime"
            label="Total Time"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
            style={{marginTop: 20}}
          />
          {method !== 'MIX' &&
          <>
            <TextField
              margin="dense"
              id="rightBrainTime"
              label="Right Brain Time"
              inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
              type="text"
              fullWidth
              variant="outlined"
              autoComplete="off"
              value={rightBrainTime}
              onChange={changeRightBrainTime}
              style={{marginTop: 20}}
            />
            <TextField
              margin="dense"
              id="leftBrainTime"
              label="Left Brain Time"
              inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
              type="text"
              fullWidth
              variant="outlined"
              autoComplete="off"
              value={leftBrainTime}
              onChange={changeLeftBrainTime}
              style={{marginTop: 20}}
            />
          </>
          }
          <FormControlLabel
            control={
              <Checkbox
                checked={isRandom}
                onChange={(e) => setIsRandom(e.target.checked)}
                name="isRandom"
                color="primary"
              />
            }
            label="Radom"
          />
          <div className={classes.label}>Method</div>
          <Select
            style={{width: '100%', textAlign: 'center', marginBottom: 10}}
            value={method}
            label="Method"
            onChange={(e) => setMethod(e.target.value)}
            MenuProps={MenuProps}
          >
            {methods.map((item, index) => (
              <MenuItem key={index} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <div className={classes.label}>Type</div>
          <Select
            style={{width: '100%', textAlign: 'center', marginBottom: 10}}
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
            MenuProps={MenuProps}
          >
            {types.map((item, index) => (
              <MenuItem key={index} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <div className={classes.label}>Display Type</div>
          <Select
            style={{width: '100%', textAlign: 'center', marginBottom: 10}}
            value={displayType}
            label="Type"
            onChange={(e) => setType(e.target.value)}
            MenuProps={MenuProps}
          >
            {displayTypes.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormControlLabel
            control={
              <Checkbox
                checked={camera}
                onChange={(e) => setCamera(e.target.checked)}
                name="camera"
                color="primary"
              />
            }
            label="Camera"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={screen}
                onChange={(e) => setScreen(e.target.checked)}
                name="screen"
                color="primary"
              />
            }
            label="Screen"
          />
          {camera&&
          <TextField
            margin="dense"
            id="cameraNumber"
            label="Camera Number"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="number"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={cameraNumber}
            onChange={(e) => setCameraNumber(e.target.value)}
            style={{marginTop: 20}}
          />
          }
          {screen&&
          <TextField
            margin="dense"
            id="screenNumber"
            label="Screen Number"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="number"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={screenNumber}
            onChange={(e) => setScreenNumber(e.target.value)}
            style={{marginTop: 20}}
          />
          }
          {(type === 'SCHEDULED' || type === 'PRE_DEFINED') &&
          <>
            <div className={classes.label}>Start Date</div>
            <TextField
              margin="dense"
              id="startDate"
              label="Start Date"
              inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
              type="date"
              fullWidth
              variant="outlined"
              autoComplete="off"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{marginTop: 20}}
            />
          </>
          }
          {type === 'SCHEDULED' &&
          <>
            <div className={classes.label}>End Date</div>
            <TextField
              margin="dense"
              id="endDate"
              label="End Date"
              inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
              type="date"
              fullWidth
              variant="outlined"
              autoComplete="off"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{marginTop: 20}}
            />
          </>
          }
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
