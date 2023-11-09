import React, {useState, useEffect} from 'react'
import {
  Grid,
  FormControl,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {NotificationManager} from 'react-notifications'
import ImageUploader from 'react-images-upload'

import {useStyles} from '../../style/common'
import {getRandomString, getFileExtension} from '../../../functions/string'
import {useAsync} from '../../../functions/utils'
import {setCookie} from '../../../functions/cookie'
import {upload} from '../../../api/file'
import {update as updateCorporate} from '../../../api/corporate'
import {useSetting} from '../../../provider/setting'

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 250,
    },
  },
};
const CompanyDetail = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {user} = props
  const [setting, dispatch] = useSetting()
  const classes = useStyles()
  const types = [
    'Software Service','Software Consulting','Software Products','Hospitality','Software as Service',
    'Software as Product','IT-Others','Automotive','Retail','Banking','Hospitality',
    'Government related','Real Estate','Transportation','Education','Others',
  ]
  const [companyName, setCompanyName] = useState('')
  const [type, setType] = useState([])
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState('')
  const [logoString, setLogoString] = useState('')
  const [image, setImage] = useState(null)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const onDrop = (file) => {
    setImage(file[0])
  }
  const handleSave = () => {
    console.log('init', setting.auth)
    if (image !== null) {
      const fileName = `exam_logos_${getRandomString(10)}.${getFileExtension(image.name)}`
      setLogo(fileName)
      run(upload(image, fileName))
      setAsyncState('upload')
      console.log(fileName)
    }
    else {
      let tmp = {}
      tmp.id = setting.auth.corporateID
      tmp.companyName = companyName
      tmp.type = type
      tmp.phone = phone
      tmp.country = country
      tmp.state = state
      tmp.description = description
      tmp.logoString = logoString
      run(updateCorporate(tmp))
      setAsyncState('updateCorporate')
    }
    setPending(true)
  }

  useEffect(() => {
    if (user) {
      setCompanyName(user?.corporate?.companyName||'')
      setType(user?.corporate?.type||[])
      setPhone(user?.corporate?.phone||'')
      setEmail(user?.email||'')
      setCountry(user?.corporate?.country||'')
      setState(user?.corporate?.state||'')
      setDescription(user?.corporate?.description||'')
      setLogoString(user?.corporate?.logoString||'')
    }
  }, [user])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'upload') {
        let tmp = {}
        tmp.id = setting.auth.corporateID
        tmp.companyName = companyName
        tmp.type = type
        tmp.phone = phone
        tmp.country = country
        tmp.state = state
        tmp.description = description
        tmp.logo = logo
        tmp.logoString = logoString
        run(updateCorporate(tmp))
        setAsyncState('updateCorporate')
      }
      else if (asyncState === 'updateCorporate') {
        console.log('setting', setting.auth)
        let tmp = Object.assign({}, setting.auth)
        tmp.corporate = data
        dispatch({type: 'SET', settingName: 'auth', settingData: tmp})
        setCookie('auth', JSON.stringify(tmp), 1)
        setPending(false)
        NotificationManager.success('Company details are updated successfully', 'Success', 3000);
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
          <Grid item xs={12}>
            <div className="form-element">
              <div className="form-label">Description</div>
              <textarea
                className={`form-textarea 'border`}
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
              </textarea>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Company Name</div>
              <input
                type="text"
                className="form-input"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Type</div>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  input={<Input />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  style={{minWidth: '100%'}}
                >
                  {types.map((name, index) => (
                    <MenuItem key={index} value={name} style={{paddingTop: 0, paddingBottom: 0}}>
                      <Checkbox checked={type.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Email Address</div>
              <input
                disabled
                type="text"
                className="form-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Phone Number</div>
              <input
                type="text"
                className="form-input"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Country</div>
              <input
                type="text"
                className="form-input"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">State</div>
              <input
                type="text"
                className="form-input"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Logo</div>
              <ImageUploader
                withIcon={false}
                withPreview={true}
                singleImage={true}
                label="Please input 100*100 image"
                buttonText='Choose image'
                onChange={(file) => onDrop(file)}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Logo String</div>
              <input
                type="text"
                className="form-input"
                placeholder="Logo String"
                value={logoString}
                onChange={(e) => setLogoString(e.target.value)}
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
export default CompanyDetail