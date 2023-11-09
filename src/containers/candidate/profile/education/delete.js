import React, {useEffect, useState} from 'react'
import {
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Delete as DeleteIcon} from '@material-ui/icons'
// import {NotificationManager} from 'react-notifications'

import {useAsync} from '../../../../functions/utils'
import {remove} from '../../../../api/education'
import DeleteConfirm from '../../../../components/DeleteConfirm'

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 18,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))
const Delete = (props) => {
  const {status, error, run} = useAsync({
    status: 'idle',
  })
  const {item, refresh} = props
  const classes = useStyles()
  const [pending, setPending] = useState(false)
  const [acitiveConfirm, setActiveConfirm] = useState(false)

  const handleDelete = () => {
    setActiveConfirm(true)
  }
  const deleteConfirm = (res) => {
    setActiveConfirm(false)
    if (res) {
      run(remove(item.id))
      setPending(true)
    }
  }

  useEffect(() => {
    if (status === 'resolved') {
      refresh()
      setPending(false)
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status, run])
  return (
    <>
      <DeleteConfirm open={acitiveConfirm} callback={deleteConfirm} />
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon className={classes.icon} />
      </IconButton>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  )
}
export default Delete
