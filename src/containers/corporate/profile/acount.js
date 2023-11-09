import React, {useState, useEffect} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {NotificationManager} from 'react-notifications'

import {useStyles} from '../../style/common'
import {useAsync} from '../../../functions/utils'
import {changePassword} from '../../../api/auth'

const Account = () => {
  const {status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pending, setPending] = useState(false)

  const validate = () => {
    let res = true
    if (currentPassword === '')
      res = false
    if (newPassword === '')
      res = false
    if (confirmPassword === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    if (newPassword !== confirmPassword) {
      res = false
      NotificationManager.warning('Confirm password is not equal', 'Worning', 3000);
    }
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    run(changePassword(currentPassword, newPassword))
    setPending(true)
  }

  useEffect(() => {
    if (status === 'resolved') {
      setPending(false)
      NotificationManager.success('Personal information successfully is updated', 'Success', 3000);
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
    else if (status === 'rejected') {
      NotificationManager.warning(error?.message, 'Worning', 3000);
      console.log(error)
      setPending(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }, [run, status])
  return (
    <Grid container style={{position: 'relative', height: 600}}>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Grid item lg={6} md={8} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Current Password</div>
              <input
                type="password"
                className="form-input"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">New Password</div>
              <input
                type="password"
                className="form-input"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Confirm Password</div>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <button 
          className={classes.button} 
          style={{position: 'absolute', bottom: -20, right: 10}}
          onClick={handleSave}
        >
          Save
        </button>
      </Grid>
    </Grid>
  )
}
export default Account