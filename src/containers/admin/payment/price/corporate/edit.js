import React, {useState, useEffect} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Edit} from '@material-ui/icons'
import {NotificationManager} from 'react-notifications'

import {useStyles} from '../../../../style/common'
import {useAsync} from '../../../../../functions/utils'
import {update} from '../../../../../api/priceCorporate'
import {isNumeric} from '../../../../../functions/string'

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
  const {item, refresh} = props
  const [modalActive, setModalActive] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [candidate, setCandidate] = useState(0)
  const [pending, setPending] = useState(false)

  const handleClickOpen = () => {
    setName(item.name)
    setPrice(item.price)
    setCandidate(item.number)
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    if (name === '')
      res = false
    if (price === 0|| !isNumeric(price))
      res = false
    if (candidate === 0|| !isNumeric(candidate))
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
    tmp.price = price
    tmp.number = candidate
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
        <DialogTitle id="form-dialog-title">Edit Corporate Price</DialogTitle>
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
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{marginTop: 20}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="candidate"
            label="Candidate"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={candidate}
            onChange={(e) => setCandidate(e.target.value)}
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
