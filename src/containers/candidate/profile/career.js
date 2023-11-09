import React, {useState, useEffect} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {NotificationManager} from 'react-notifications'

import {useStyles} from '../../style/common'
import {useAsync} from '../../../functions/utils'
import {update as updateProfile} from '../../../api/profile'
import {useSetting} from '../../../provider/setting'

const Account = (props) => {
  const {status, error, run} = useAsync({
    status: 'idle',
  })
  const {user} = props
  const [setting] = useSetting()
  const classes = useStyles()
  const [domain, setDomain] = useState('')
  const [hobby, setHobby] = useState('')
  const [significantAchievement, setSignificantAchievement] = useState('')
  const [interestedCompany, setInterestedCompany] = useState('')
  const [interestedLocation, setInterestedLocation] = useState('')
  const [locationOutside, setLocationOutside] = useState('')
  const [interestedJob, setInterestedJob] = useState('')
  const [description, setDescription] = useState('')
  const [pending, setPending] = useState(false)

  const handleSave = () => {
    let tmp = {}
    tmp.id = setting.auth.profileID
    tmp.domain = domain
    tmp.hobby = hobby
    tmp.significantAchievement = significantAchievement
    tmp.interestedCompany = interestedCompany
    tmp.interestedLocation = interestedLocation
    tmp.locationOutside = locationOutside
    tmp.interestedJob = interestedJob
    tmp.description = description
    run(updateProfile(tmp))
    setPending(true)
  }

  useEffect(() => {
    if (user) {
      setDomain(user?.profile?.domain||'')
      setHobby(user?.profile?.hobby||'')
      setSignificantAchievement(user?.profile?.significantAchievement||'')
      setInterestedCompany(user?.profile?.interestedCompany||'')
      setInterestedLocation(user?.profile?.interestedLocation||'')
      setLocationOutside(user?.profile?.locationOutside||'')
      setInterestedJob(user?.profile?.interestedJob||'')
      setDescription(user?.profile?.description||'')
    }
  }, [user])
  useEffect(() => {
    if (status === 'resolved') {
      setPending(false)
      NotificationManager.success('Career successfully is updated', 'Success', 3000);
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
      <Grid item lg={8} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Work exprerience for particular domain</div>
              <input
                type="text"
                className="form-input"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Hobby</div>
              <input
                type="text"
                className="form-input"
                placeholder="Hobby"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Significant achievements</div>
              <input
                type="text"
                className="form-input"
                placeholder="Significant achievements"
                value={significantAchievement}
                onChange={(e) => setSignificantAchievement(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Interested Company</div>
              <input
                type="text"
                className="form-input"
                placeholder="Interested Company"
                value={interestedCompany}
                onChange={(e) => setInterestedCompany(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Interested location</div>
              <input
                type="text"
                className="form-input"
                placeholder="Interested location"
                value={interestedLocation}
                onChange={(e) => setInterestedLocation(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Interested location outside the country</div>
              <input
                type="text"
                className="form-input"
                placeholder="Interested location outside the country"
                value={locationOutside}
                onChange={(e) => setLocationOutside(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="form-element">
              <div className="form-label">Interested type of job</div>
              <input
                type="text"
                className="form-input"
                placeholder="Interested type of job"
                value={interestedJob}
                onChange={(e) => setInterestedJob(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-element">
              <div className="form-label">Description about the motivation</div>
              <textarea
                className={`form-textarea 'border`}
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </Grid>
        </Grid>
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
export default Account