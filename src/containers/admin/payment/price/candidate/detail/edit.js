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

import {usePriceCandidate} from '../../../../../../provider/priceCandidate'
import {useStyles} from '../../../../../style/common'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const EditDialog = (props) => {
  const [priceCandidate, dispatch] = usePriceCandidate()
  const customeClasses = useCustomStyles()
  const classes = useStyles()
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
  const handleSave = () => {
    if (!validate())
      return
    let details = [...priceCandidate.details]
    details[index] = info
    dispatch({type: 'SET', name: 'details', value: details})
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
        <DialogTitle id="form-dialog-title">Edit Detail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please input data
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="info"
            label="Info"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            multiline
            rows={4}
            value={info}
            onChange={(e) => setInfo(e.target.value)}
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
export default EditDialog
