import React, {useState} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Edit} from '@material-ui/icons'
import {NotificationManager} from 'react-notifications'

import {useTemplate} from '../../../../provider/template'
import {useStyles} from '../../../style/common'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const EditDialog = (props) => {
  const [template, dispatch] = useTemplate()
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  // const [setting, dispatch] = useSetting()
  const {item, index} = props
  const [modalActive, setModalActive] = useState(false)
  const [info, setInfo] = useState('')

  const handleClickOpen = () => {
    setInfo(item)
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    if (info === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleUpdate = () => {
    if (!validate())
      return
    let instructions = [...template.instructions]
    instructions[index] = info
    dispatch({type: 'SET', name: 'instructions', value: instructions})
    setModalActive(false)
  }

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <Edit className={classes.icon} />
      </IconButton>
      <Dialog 
        disableBackdropClick
        disableEscapeKeyDown
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title">Edit Instruction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please input data
          </DialogContentText>
          <TextField
            margin="dense"
            id="info"
            label="Info"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            style={{marginTop: 20}}
          />
        </DialogContent>
        <DialogActions>
          <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handleClose} color="primary">
            Cancel
          </button>
          <button className={classes.button} onClick={handleUpdate} color="primary">
            Update
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default EditDialog
