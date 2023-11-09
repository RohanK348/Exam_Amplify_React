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
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

// import {useSetting} from '../../../provider/setting'
import {useStyles} from '../../style/common'
import {useAsync} from '../../../functions/utils'
import {create, getFilter} from '../../../api/topic'

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
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const customeClasses = useCustomStyles()
  const classes = useStyles();
  // const [setting, dispatch] = useSetting()
  const {refresh} = props
  const [modalActive, setModalActive] = useState(false)
  const [name, setName] = useState('')
  const [brain, setBrain] = useState('right')
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const handleClickOpen = () => {
    setName('')
    setBrain('right')
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    if (name === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    run(getFilter({name: {eq: name}}))
    setAsyncState('getTopic')
    
    setPending(true)
  }

  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getTopic') {
        if (data.length !== 0) {
          NotificationManager.warning('Do not input same name.', 'Worning', 3000);
          setPending(false)
          setAsyncState('')
        }
        else {
          run(create({
            name: name,
            brain: brain,
          }))
          setAsyncState('create')
        }
      }
      else if (asyncState === 'create') {
        setPending(false)
        setModalActive(false) 
        refresh()
      }
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
          <TextField
            autoFocus
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
          <div className={classes.label}>Brain</div>
          <Select
            style={{width: '100%', textAlign: 'center', marginBottom: 10}}
            value={brain}
            label="Brain"
            onChange={(e) => setBrain(e.target.value)}
            MenuProps={MenuProps}
          >
            <MenuItem value="right">
              Right
            </MenuItem>
            <MenuItem value="left">
              Left
            </MenuItem>
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
