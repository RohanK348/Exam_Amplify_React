import React, {useState, useEffect} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

import Widget from '../../../components/widget'
import {useStyles} from '../../style/common'
import {create as createExamResult} from '../../../api/examResult'
import {update as updateTrain} from '../../../api/train'
import {create as createExam} from '../../../api/exam'
import {getExams} from '../../../api/template'
import {useAsync} from '../../../functions/utils'
import {isEmptyObject} from '../../../functions/common'
import {useSetting} from '../../../provider/setting'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
  title: {
    fontWeight: 'bold'
  },
  instruction: {
    padding: '20px 30px',
  },
  item: {
    paddingBottom: 10,
    listStyleType: 'disc',
  }
}))
const First = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {exam, train, examResult, setExam, setExamResult, start, setCameraIC, setCameraTrack} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [setting] = useSetting()
  const [instructions, setInstructions] = useState([])
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [totalTime, setTotalTime] = useState('')
  const [accept, setAccept] = useState(false)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const handleStart = () => {
    if (!exam.isTrain&&!accept) {
      NotificationManager.warning('Please accept camera option', 'Worning', 3000);
    }
    else {
      if (isEmptyObject(examResult)) {
        if (exam?.isRandom) {
          run(getExams(exam.templateID))
          setAsyncState('getExams')
        }
        else {
          let corporateId = ""
          if (exam.openingID !== "")
            corporateId = exam?.opening?.corporate?.id
          run(createExamResult({
            userID: setting.auth.id,
            examID: exam.id,
            questionIndex: 1,
            backNumber: 4,
            isTrain: exam.isTrain,
            corporateID: corporateId,
          }))
          setAsyncState('createExamResult')
        }
        setPending(true)
      }
      else {
        start()
      }
    }
  }
  const handleAccept = () => {
    setAccept(true)
  }
  const handleReject = () => {
    setAccept(false)
  }

  useEffect(() => {
    setInstructions(exam?.template?.instructions||[])
    setTotalQuestion(exam?.right?.length + exam?.left?.length)
    setTotalTime(`${Math.ceil(exam?.totalTime/60)} min`)
    if (exam?.camera) {
      navigator.mediaDevices.getUserMedia({
        video: true,
      }).then(stream => {
        document.querySelector('#camera').srcObject = stream;
        // get correct video track
        const track = stream.getVideoTracks()[0]
        setCameraTrack(track)
        // init Image Capture and not Video stream
        const imageCapture = new ImageCapture(track)
        setCameraIC(imageCapture)
      })
    }
  }, [exam])
    useEffect(() => {
      if (status === 'resolved') {
        if (asyncState === 'createExamResult') {
          console.log(data)
          setExamResult(data)
          if (!exam.isTrain) {
            setAsyncState('')
            setPending(false)
            start()
          }
          else {
            let tmp = {}
            tmp.id = train.id
            tmp.examResultID = data.id
            run(updateTrain(tmp))
            setAsyncState('updateTrain')
          }
        }
        else if (asyncState === 'updateTrain') {
          setAsyncState('')
          setPending(false)
          start()
        }
        else if (asyncState === 'getExams') {
          const res = data?.result
          if (res?.rights?.length === 0) {
            NotificationManager.warning('Question number is not enough', 'Worning', 3000)
            setPending(false)
            setAsyncState('')
          }
          else if (res?.lefts?.length === 0) {
            NotificationManager.warning('Question number is not enough', 'Worning', 3000)
            setPending(false)
            setAsyncState('')
          }
          else {
            let tmp = exam
            tmp.right = res?.rights
            tmp.left = res?.lefts
            run(createExam(tmp))
            setAsyncState('create')
          }
        }
        else if (asyncState === 'create') {
          setExam(data)
          let corporateId = ""
          if (exam.openingID !== "")
            corporateId = exam?.opening?.corporate?.id
          run(createExamResult({
            userID: setting.auth.id,
            examID: exam.id,
            questionIndex: 1,
            backNumber: 4,
            isTrain: exam.isTrain,
            corporateID: corporateId,
          }))
          setAsyncState('createExamResult')
        }
      }
      else if (status === 'rejected') {
        console.log(error)
        setPending(false)
      }
    }, [status])
  return (
    <Grid container spacing={3}>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Grid item md={9} xs={12}>
        <Widget
          title=""
          description={
            <span>
              Total Questions: {totalQuestion}
            </span>
          }
          right={
            <div>
              Total Time: <span style={{color: 'red'}}>{totalTime}</span>
            </div>
          }>
          <div style={{minHeight: 650}}>
            <div className={customeClasses.title}>Instructions For Indesign Skills Assessment</div>
            <ul className={customeClasses.instruction}>
              {instructions.map((item, index) => (
                <li className={customeClasses.item} key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div  style={{padding: 20}}>
            {exam?.isTrain?
            <Link to={`/train`} style={{textDecoration: 'none'}}>
              <button className={`${classes.button} ${customeClasses.cancel}`} >Cancel</button>
            </Link>:
            <Link to={`/opening/detail/${exam?.openingID}`} style={{textDecoration: 'none'}}>
            <button className={`${classes.button} ${customeClasses.cancel}`} >Cancel</button>
          </Link>
            }
            <button className={classes.button} style={{float: 'right'}} onClick={handleStart}>Start Exam</button>
          </div>
        </Widget>
      </Grid>
      <Grid item md={3} xs={12}>
        {!exam?.isTrain&&
        <Widget
          title=""
          description={
            <span>
              Camera Option
            </span>
          }>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div>
            <video id="camera" autoPlay></video>
            {/* {isCamera?
            <>
            <img alt="camera" src="/images/candidate/camera.jpg" style={{width: 250}} />
            <video id="camera" autoPlay style={{display: 'none'}}></video>
            </>
            } */}
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', padding: 30}}>
          {accept?
          <button className={classes.button} onClick={handleReject}>Accepted</button>:
          <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handleAccept} >Accept</button>
          }
        </div>
        </Widget>
        }
      </Grid>
    </Grid>
  )
}
export default First
