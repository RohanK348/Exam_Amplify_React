import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid,
  LinearProgress,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {ArrowRight} from '@material-ui/icons'

import './style/index.css'
import SectionTitle from '../../components/section-title'
import Widget from '../../components/widget'
import {useStyles} from '../style/common'
import {useAsync} from '../../functions/utils'
import {useSetting} from '../../provider/setting'
import {get as getUser} from '../../api/user'
import {propertyNumber, removeNullProperty} from '../../functions/common'
import {getFilter as getCorporates} from '../../api/favoriteCorporate'
import {getFilter as getOpenings} from '../../api/favoriteOpening'
import {getNumberWithoutComplete as getNumberExams} from '../../api/exam'

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress)

const DashoboradWidget = (props) => {
  const {icon,number,title, buttonTitle, goto} = props
  return (
    <Widget>
      <Grid container className="dashboard-widget">
        <Grid item xs={5}>
          <img alt="icon" src={icon} />
        </Grid>
        <Grid item xs={7}>
          <div className="number">{number}</div>
          <div className="title">{title}</div>
          <Link to={goto} style={{textDecoration: 'none'}}>
            <div className="button">
              <span>{buttonTitle}</span>
              <ArrowRight style={{fontSize: 30, marginRight: -15}} />
            </div>
          </Link>
        </Grid>
      </Grid>
    </Widget>
  )
}

const CompanyWidget = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [number, setNumber] = useState(0)
  const [setting] = useSetting()

  useEffect(() => {
    if (setting.auth) {
      run(getCorporates({userID: {eq: setting.auth.id}}))
    }
  }, [run, setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      setNumber(data.length)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <DashoboradWidget 
      icon={`${process.env.PUBLIC_URL}/images/corporate/icon_4.png`}
      number={number}
      title="FAVORITE COMPANIES"
      buttonTitle="View Companies"
      goto="/favorite/company"
    />
  )
}

const OpeningWidget = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [number, setNumber] = useState(0)
  const [setting] = useSetting()

  useEffect(() => {
    if (setting.auth) {
      run(getOpenings({userID: {eq: setting.auth.id}}))
    }
  }, [run, setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      setNumber(data.length)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <DashoboradWidget 
      icon={`${process.env.PUBLIC_URL}/images/corporate/icon_2.png`}
      number={number}
      title="APPLIED OPENING"
      buttonTitle="View Openings"
      goto="/favorite/opening"
    />
  )
}

const ExamWidget = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [number, setNumber] = useState(0)
  const [setting] = useSetting()

  useEffect(() => {
    if (setting.auth) {
      run(getNumberExams(setting?.auth?.id))
    }
  }, [run, setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      setNumber(data)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <DashoboradWidget 
      icon={`${process.env.PUBLIC_URL}/images/corporate/icon_3.png`}
      number={number}
      title="UPCOMING EXAMS"
      buttonTitle="View Exams"
      goto="exam/upcoming"
    />
  )
}

const Home = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [setting] = useSetting()
  const [profileComplete, setProfileComplete] = useState(65)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (setting?.auth) {
      run(getUser(setting?.auth?.id))
      setPending(true)
    }
  }, [run, setting?.auth])
  useEffect(() => {
    if (status === 'resolved') {
      let profile = data?.profile
      profile = removeNullProperty(profile)
      let complete = 65 + 45 * propertyNumber(profile)/19 
      setProfileComplete(Math.min(complete, 100))
      setPending(false)
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
    <>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <SectionTitle title="Candidate" subtitle="Candidate Dashboard" />
      <Grid container className={classes.root} spacing={2}>
        <Grid item lg={9} xs={12}>
          <Widget
            title=""
            description={
              <span className="title">
                Complete your profile
              </span>
            }>
            <Grid container className="profile">
              <Grid item lg={9} sm={12}>
                <BorderLinearProgress variant="determinate" value={profileComplete} />
                <div className="description">
                  <img alt="icon" src={`${process.env.PUBLIC_URL}/images/corporate/icon_1.png`} style={{width: 80}}/>
                  <div style={{marginLeft: 20}}>
                    <div>
                      Complete your profile as much as you can to get more relevant data related to you.
                    </div>
                    <div>
                      Please click the button ‘Continue’ to update your profile
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item lg={3} sm={12} style={{position: 'relative', height: 100, width: 400}}>
                <Link to={`/profile`} style={{textDecoration: 'none'}}>
                  <button className={classes.button} style={{position: 'absolute', bottom: 20, right: 20}}>Continue</button>
                </Link>
              </Grid>
            </Grid>
          </Widget>
          <Grid container spacing={3}>
            <Grid item lg={4} xs={12}>
              <OpeningWidget />
            </Grid>
            <Grid item lg={4} xs={12}>
              <ExamWidget />
            </Grid>
            <Grid item lg={4} xs={12}>
              <CompanyWidget />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default Home
