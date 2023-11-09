import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { NotificationManager } from 'react-notifications'

import SectionTitle from '../../../components/section-title'
import {useStyles} from '../../style/common'
import First from './first'
import Base from './base/index'
import Result from './result'
import {get as getExam} from '../../../api/exam'
import {getFilter as getExamResult, update as updateExamResult} from '../../../api/examResult'
import {getFilter as getTrain} from '../../../api/train'
import {useAsync} from '../../../functions/utils'
import {useSetting} from '../../../provider/setting'
import {isEmptyObject} from '../../../functions/common'

const Index = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const {id} = useParams()
  const classes = useStyles()
  const [exam, setExam] = useState({})
  const [examResult, setExamResult] = useState({})
  const [train, setTrain] = useState({})
  const [step, setStep] = useState(1)
  const [result, setResult] = useState('')
  const [screenIC, setScreenIC] = useState({})
  const [cameraIC, setCameraIC] = useState({})
  const [cameraTrack, setCameraTrack] = useState({})
  const [isStart, setIsStart] = useState(false)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const nextStep = () => {
    if (step > 0) {
      let tmp = {}
      tmp.id = examResult.id
      tmp.questionIndex = step + 1
      run(updateExamResult(tmp))
      setAsyncState('nextStep')
    }
    else
      setStep(step + 1)
  }
  const prevStep = () => {
    let tmp = {}
    tmp.id = examResult.id
    tmp.questionIndex = step - 1
    run(updateExamResult(tmp))
    setAsyncState('prevStep')
  }
  const changeStep = (number, isSetIndex=false) => {
    setStep(number)
    if (isSetIndex) {
      let tmp = {}
      tmp.id = examResult.id
      tmp.questionIndex = number
      updateExamResult(tmp)
    }
  }
  const handleStart = async () => {
    let _isStart = true
    if (exam?.screen) {
      const canIRun  = navigator.mediaDevices.getDisplayMedia 
      if (canIRun) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: { mediaSource: 'screen' },
        })
        document.querySelector('video').srcObject = stream;
        // get correct video track
        const track = stream.getVideoTracks()[0]
        // init Image Capture and not Video stream
        const imageCapture = new ImageCapture(track)
        setScreenIC(imageCapture)
        // get user selected setting
        const settings = track.getSettings()
        if (settings.deviceId !== 'screen:0:0') {
          _isStart = false
          NotificationManager.warning('Please select Entired Screen method', 'Worning', 3000);
        }
      }
    }
    console.log('camera capture image', cameraIC)
    if (exam.camera && isEmptyObject(cameraIC)) {
      _isStart = false
      NotificationManager.warning('Please check your camera state', 'Worning', 3000);
    }
    if (_isStart) {
      setIsStart(true)
    }
  }

  useEffect(() => {
    run(getExam(id))
    setAsyncState('getExam')
    setPending(true)
  }, [id])
  useEffect(() => {
    if (result !== '' && !isEmptyObject(cameraTrack)) {
      cameraTrack.stop()
    }
  }, [result, cameraTrack])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getExam') {
        setExam(data)
        run(getExamResult({examID: {eq: data.id}, userID: {eq: setting.auth.id}}))
        setAsyncState('getExamResult')
      }
      else if (asyncState === 'getExamResult') {
        if (data.length !== 0) {
          setExamResult(data[0])
          if (data[0]?.resultID) {
            setResult(data[0]?.result?.percentage)
          }
          setStep(data[0].questionIndex)
        }
        if (exam.isTrain) {
          let templateId = ''
          if (exam.templateType === 'normal')
            templateId = exam?.templateID
          else if (exam.templateType === 'improve')
            templateId = exam?.improveTemplateID
          run(getTrain({userID: {eq: setting?.auth?.id}, templateID: {eq: templateId}}))
          setAsyncState('getTrain')
        }
        else {
          setAsyncState('')
          setPending(false)
        }
      }
      else if (asyncState === 'getTrain') {
        if (data.length !== 0) {
          setTrain(data[0])
          setPending(false)
          setAsyncState('')
        }
        else {
          let templateId = ''
          if (exam.templateType === 'normal')
            templateId = exam?.templateID
          else if (exam.templateType === 'improve')
            templateId = exam?.improveTemplateID
          run(getTrain({userID: {eq: setting?.auth?.id}, templateID: {eq: templateId}}))
        }
      }
      else if (asyncState === 'nextStep') {
        setStep(step + 1)
      }
      else if (asyncState === 'prevStep') {
        setStep(step - 1)
      }
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
  <>
    <video id="screen" autoPlay style={{display: 'none'}}></video>
    <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
      <CircularProgress color="primary" />
    </Backdrop>
    <SectionTitle title="Exam" subtitle={exam?.name} />
    {result!==''?
    <Result result={result} train={train} exam={exam} />:
    (!isStart?
    <First 
      exam={exam} 
      examResult={examResult} 
      train={train} 
      setExam={setExam}
      nextStep={nextStep} 
      setExamResult={setExamResult} 
      start={handleStart}
      setCameraIC={setCameraIC} 
      setCameraTrack={setCameraTrack}
    />:
    <Base 
      exam={exam} 
      examResult={examResult} 
      step={step} 
      screenIC={screenIC}
      cameraIC={cameraIC} 
      cameraTrack={cameraTrack}
      nextStep={nextStep} 
      prevStep={prevStep} 
      changeStep={changeStep} 
      setResult={setResult} 
    />)
    }
  </>
  )
}

export default Index
