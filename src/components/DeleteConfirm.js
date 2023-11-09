import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'

const DeleteConfirm = (props) => {
  const {open, callback} = props
  const [active, setActive] = useState(false)
  const handleClose = () => {
    setActive(false)
    callback(false)
  }
  const handleOk = () =>  {
    setActive(false)
    callback(true)
  }

  useEffect(() => {
    setActive(open)
  }, [open])
  return (
    <Dialog
      open={active}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle id="alert-dialog-title">Delete Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to delete this?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="secondary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default DeleteConfirm