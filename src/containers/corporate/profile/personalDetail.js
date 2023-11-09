import React, {useState, useEffect} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {NotificationManager} from 'react-notifications'
import ImageUploader from 'react-images-upload'

import {useStyles} from '../../style/common'
import {getRandomString, getFileExtension} from '../../../functions/string'
import {upload} from '../../../api/file'
import {useAsync} from '../../../functions/utils'
import {update as updateUser} from '../../../api/user'
import {setCookie} from '../../../functions/cookie'
import {useSetting} from '../../../provider/setting'

const PersonalDetail = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {user} = props
  const [setting, dispatch] = useSetting()
  const classes = useStyles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [avatar, setAvatar] = useState('')
  const [image, setImage] = useState(null)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const onDrop = (file) => {
    setImage(file[0])
  }
  const handleSave = () => {
    if (image !== null) {
      console.log('upload')
      const fileName = `exam_avatars_${getRandomString(10)}.${getFileExtension(image.name)}`
      setAvatar(fileName)
      run(upload(image, fileName))
      setAsyncState('upload')
      setPending(true)
    }
    else {
      let tmp = {}
      tmp.id = setting.auth.id
      tmp.firstName = firstName
      tmp.lastName = lastName
      tmp.phone = phone
      tmp.companyRole = role
      run(updateUser(tmp))
      setPending(true)
      setAsyncState('update')
    }
  }

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName||'')
      setLastName(user?.lastName||'')
      setPhone(user?.phone||'')
      setRole(user?.companyRole||'')
    }
  }, [user])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'upload') {
        let tmp = {}
        tmp.id = setting.auth.id
        tmp.firstName = firstName
        tmp.lastName = lastName
        tmp.phone = phone
        tmp.companyRole = role
        tmp.avatar = avatar
        run(updateUser(tmp))
        setAsyncState('update')
      }
      else if (asyncState === 'update') {
        dispatch({type: 'SET', settingName: 'auth', settingData: data})
        setCookie('auth', JSON.stringify(data), 1)
        setPending(false)
        NotificationManager.success('Personal information successfully is updated', 'Success', 3000);
      }
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
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
              <div className="form-label">First Name</div>
              <input
                type="text"
                className="form-input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Last Name</div>
              <input
                type="text"
                className="form-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Role</div>
              <input
                type="text"
                className="form-input"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Phone</div>
              <input
                type="text"
                className="form-input"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Avatar</div>
              <ImageUploader
                withIcon={false}
                withPreview={true}
                singleImage={true}
                label="Please input 100*100 image"
                buttonText='Upload Image'
                onChange={(file) => onDrop(file)}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
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
export default PersonalDetail