import React, {useState, useEffect} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {NotificationManager} from 'react-notifications'
import ImageUploader from 'react-images-upload'

import {useStyles} from '../../style/common'
import {getRandomString, getFileExtension, isPhoneNumber} from '../../../functions/string'
import {useAsync} from '../../../functions/utils'
import {upload} from '../../../api/file'
import {setCookie} from '../../../functions/cookie'
import {update as updateProfile} from '../../../api/profile'
import {update as updateUser} from '../../../api/user'
import {useSetting} from '../../../provider/setting'

const PersonalDetail = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {user} = props
  const [setting, dispatch] = useSetting()
  const classes = useStyles()
  const [avatar, setAvatar] = useState('')
  const [image, setImage] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [facebook, setFacebook] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const onDrop = (file) => {
    setImage(file[0])
  }
  const validate = () => {
    let res = true
    if (!isPhoneNumber(phone))
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    if (image !== null) {
      const fileName = `exam_avatars_${getRandomString(10)}.${getFileExtension(image.name)}`
      setAvatar(fileName)
      run(upload(image, fileName))
      setAsyncState('upload')
    }
    else {
      let tmp = {}
      tmp.id = setting.auth.id
      tmp.firstName = firstName
      tmp.lastName = lastName
      tmp.phone = phone
      run(updateUser(tmp))
      setAsyncState('updateUser')
    }
    setPending(true)
  }

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName||'')
      setLastName(user?.lastName||'')
      setPhone(user?.phone||'')
      setAddress(user?.profile?.address||'')
      setWhatsapp(user?.profile?.whatsapp||'')
      setFacebook(user?.profile?.facebook||'')
      setLinkedin(user?.profile?.linkedin||'')
      setTwitter(user?.profile?.twitter||'')
      setInstagram(user?.profile?.instagram||'')
      setTiktok(user?.profile?.tiktok||'')
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
        tmp.avatar = avatar
        run(updateUser(tmp))
        setAsyncState('updateUser')
      }
      else if (asyncState === 'updateUser') {
        dispatch({type: 'SET', settingName: 'auth', settingData: data})
        setCookie('auth', JSON.stringify(data), 1)
        let tmp = {}
        tmp.id = setting.auth.profileID
        tmp.address = address
        tmp.whatsapp = whatsapp
        tmp.facebook = facebook
        tmp.linkedin = linkedin
        tmp.twitter = twitter
        tmp.instagram = instagram
        tmp.tiktok = tiktok
        run(updateProfile(tmp))
        setAsyncState('updateProfile')
      }
      else if (asyncState === 'updateProfile') {
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
    <Grid container style={{position: 'relative', minHeight: 600}}>
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
              <div className="form-label">Address</div>
              <input
                type="text"
                className="form-input"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Whatsapp</div>
              <input
                type="text"
                className="form-input"
                placeholder="Whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Facebook</div>
              <input
                type="text"
                className="form-input"
                placeholder="Facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Linkedin</div>
              <input
                type="text"
                className="form-input"
                placeholder="Linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Twitter</div>
              <input
                type="text"
                className="form-input"
                placeholder="Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Instagram</div>
              <input
                type="text"
                className="form-input"
                placeholder="Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">TikTok</div>
              <input
                type="text"
                className="form-input"
                placeholder="TikTok"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} md={4} xs={12}>
        <ImageUploader
          withIcon={false}
          withPreview={true}
          singleImage={true}
          buttonText='Choose image'
          onChange={(file) => onDrop(file)}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        />
      </Grid>
      <Grid item xs={12} style={{height: 100}}>
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