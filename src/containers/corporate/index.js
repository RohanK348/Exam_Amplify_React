import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {  withStyles } from '@material-ui/core/styles'
import {
  Grid,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {ArrowRight} from '@material-ui/icons'

import './style/index.css'
import SectionTitle from '../../components/section-title'
import Widget from '../../components/widget'
import {propertyNumber, removeNullProperty} from '../../functions/common'
import {useStyles} from '../style/common'
import {useAsync} from '../../functions/utils'
import {useSetting} from '../../provider/setting'
import {get as getUser} from '../../api/user'
import {getNumber as getOpeningNumber, getExamNumber} from '../../api/opening'
import {getStudentNumber} from '../../api/favoriteOpening'

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
}))(LinearProgress);

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

const OpeningWidget = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [number, setNumber] = useState(0)
  const [setting] = useSetting()

  useEffect(() => {
    if (setting.auth) {
      run(getOpeningNumber(setting?.auth?.corporateID))
    }
  }, [run, setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      setNumber(data||0)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <DashoboradWidget 
      icon={`${process.env.PUBLIC_URL}/images/corporate/icon_2.png`}
      number={number}
      title="CURRENT OPENING"
      buttonTitle="View Details"
      goto="corporate/opening"
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
      run(getExamNumber(setting?.auth?.corporateID))
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
      title="EXAMS"
      buttonTitle="View Openings"
      goto="corporate/opening"
    />
  )
}

const CandidateWidget = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [number, setNumber] = useState(0)
  const [setting] = useSetting()

  useEffect(() => {
    if (setting.auth) {
      run(getStudentNumber(setting?.auth?.corporateID))
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
      icon={`${process.env.PUBLIC_URL}/images/corporate/icon_4.png`}
      number={number}
      title="CANDIDATE IMPRESSIONS"
      buttonTitle="View Openings"
      goto="corporate/appliedCandidate"
    />
  )
}

const Home = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const history = useHistory()
  const classes = useStyles()
  const [modalActive, setModalActive] = useState(false)
  const [profileComplete, setProfileComplete] = useState(65)
  const [pending, setPending] = useState(false)

  const handleClose = () => {
    setModalActive(false)
  }
  const handleAccept = () => {
    setModalActive(false)
    history.push('/corporate/opening/create')
  }

  useEffect(() => {
    if (setting?.auth) {
      run(getUser(setting?.auth?.id))
      setPending(true)  
    }
  }, [run, setting?.auth])
  useEffect(() => {
    if (status === 'resolved') {
      let corporate  = data?.corporate
      corporate = removeNullProperty(corporate)
      let complete = 65 + 45 * propertyNumber(corporate)/11 
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
      <SectionTitle title="Coporate" subtitle="Coporate Dashboard" />
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
                <Link to={`/corporate/profile`} style={{textDecoration: 'none'}}>
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
              <CandidateWidget />
            </Grid>
          </Grid>
          <Grid container justify="center" className="opening">
            <Grid item xs={8}>
              <div className="description">Looks like there are no job posts here</div>
              <div className="title">Add your first Job Post</div>
              <Grid container className="opening-items">
                <Grid item className="opening-item" lg={3} sm={6} xs={12}>
                  <div className="icon">
                    <div className="border">
                      <img alt="opening" src={`${process.env.PUBLIC_URL}/images/corporate/icon_5.png`} style={{width: 100, height: 100}} />
                    </div>
                  </div>
                  <div style={{textAlign: 'center'}}>1</div>
                  <div style={{textAlign: 'center'}}>Select Position</div>
                </Grid>
                <Grid item className="opening-item" lg={3} sm={6} xs={12}>
                  <div className="icon">
                    <div className="border" style={{backgroundColor: '#FCE2B8'}}>
                      <img alt="opening" src={`${process.env.PUBLIC_URL}/images/corporate/icon_6.png`} style={{width: 80, height: 80}} />
                    </div>
                  </div>
                  <div style={{textAlign: 'center'}}>2</div>
                  <div style={{textAlign: 'center'}}>Add Details</div>
                </Grid>
                <Grid item className="opening-item" lg={3} sm={6} xs={12}>
                  <div className="icon">
                    <div className="border" style={{backgroundColor: '#B8CAFC'}}>
                      <img alt="opening" src={`${process.env.PUBLIC_URL}/images/corporate/icon_7.png`} style={{width: 80, height: 80}} />
                    </div>
                  </div>
                  <div style={{textAlign: 'center'}}>3</div>
                  <div style={{textAlign: 'center'}}>Select Career Template</div>
                </Grid>
                <Grid item className="opening-item" lg={3} sm={6} xs={12}>
                  <div className="icon">
                    <div className="border" style={{backgroundColor: '#B8FCD7'}}>
                      <img alt="opening" src={`${process.env.PUBLIC_URL}/images/corporate/icon_8.png`} style={{width: 80, height: 80}} />
                    </div>
                  </div>
                  <div style={{textAlign: 'center'}}>4</div>
                  <div style={{textAlign: 'center'}}>Schedule</div>
                </Grid>
              </Grid>
              <div style={{display: 'flex', justifyContent: 'center', paddingBottom: 100}}>
                <button className={classes.button} onClick={() => setModalActive(true)}>Create Opening</button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title" style={{paddingTop: 30}}>Create New Opening</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          </DialogContentText>
          <button className={classes.button} onClick={handleAccept} color="primary" style={{marginBottom: 30}}>
            Accept <span>&#38;</span> Proceed
          </button>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Home
