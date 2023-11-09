import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react'
import {
  Grid,
} from '@material-ui/core'
import { NotificationManager } from 'react-notifications'

import Widget from '../../../../components/widget'
import {useAsync} from '../../../../functions/utils'
import {getStates} from '../../../../api/examResult'
import {N2SW0} from '../../../../functions/string'
import Screen from './screen'

const QuestionItem = (props) => {
  const {number, type, onClick} = props
  const handleClick = () => {
    onClick(number)
  }
  return (
    <div className="p-2">
      <div className={`questionItem ${type==='attempted'? 'attempted': 
        type==='notAttempted'? 'notAttempted': 
        type==='reviewed'? 'reviewed': 
        type==='notView'? 'notView': ''}`}
        onClick={handleClick}
      >
        {number}
      </div>
    </div>
  )
}

const QuestionView = forwardRef((props, ref) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {examResult, screenIC, cameraIC, changeStep, brain, finish, handleFinish} = props
  const [states, setStates] = useState([])
  const [method, setMethod] = useState('')
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')
  const [second, setSecond] = useState('00')
  const [time, setTime] = useState(0)
  const screenRef = useRef()
  const cameraRef = useRef()

  useImperativeHandle(ref, () => ({
    changeState(step, state) {
      states[step-1] = state
      setStates(states)
    }
  }));
  const handleQuetion = (number) => {
    let res = true
    if (examResult?.exam?.displayType === 'BACK_ENABLED' && examResult?.exam?.method === 'SEPARATE') {
      if (brain === 'right' && examResult?.exam?.right?.length < number)
        res = false
      if (brain === 'left' && examResult?.exam?.right?.length >= number)
        res = false
    }
    if (examResult?.exam?.displayType === 'SEQUENTIAL')
      res = false
    if (res)
      changeStep(number)
  }

  useEffect(() => {
    if (examResult?.id) {
      run(getStates(examResult.id))
      setMethod(examResult?.exam?.method)
    }
  }, [run, examResult])
  useEffect(() => {
    if (examResult?.id) {
      // timer
      const interval = setInterval(function () {
        const current = new Date()
        const start = new Date(examResult?.startTime)
        const dif = Math.ceil((current - start)/1000)
        let restTime = 0
        if (examResult?.exam?.method === 'SEPARATE' && brain === 'right') {
          restTime = examResult?.exam?.rightBrainTime - dif
        }
        else
          restTime = examResult?.exam?.totalTime - dif
        // rest time 1 minute
        if (restTime === 60) {
          if (brain === 'right') {
            NotificationManager.warning('After 1 minute, this exam go to next brain', 'Worning', 3000);
          }
          else if (brain === 'left') {
            NotificationManager.warning('After 1 minute, this exam is closed', 'Worning', 3000);
          }
        }
        // next time
        if (restTime < 0) { 
          console.log(brain)
          if (brain === 'right')
            changeStep(examResult?.right?.length + 1, true)
          else if (brain === 'left') {
            finish()
            clearInterval(interval)
          }
        }
        const newHour = Math.floor(restTime/3600)
        setHour(N2SW0(newHour))
        const newMinute = Math.floor((restTime%3600)/60)
        setMinute(N2SW0(newMinute))
        const newSecond = restTime%60
        setSecond(N2SW0(newSecond))
        setTime(time + 1)
        // screen
        let isScreen = examResult?.exam?.screen
        let timeInterval = examResult?.exam?.screenNumber * 60
        if (timeInterval !== 0) {
          if (isScreen && !examResult?.exam?.isTrain && time%timeInterval===1) {
            screenRef.current.submitScreen()
          }
        }
        // camera
        let isCamera = examResult?.exam?.camera
        timeInterval = examResult?.exam?.cameraNumber * 60
        if (timeInterval !== 0) {
          if (isCamera && !examResult?.exam?.isTrain && time%timeInterval===1) {
            cameraRef.current.submitScreen()
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [run, examResult, brain, time])
  useEffect(() => {
    if (status === 'resolved') {
      setStates(data)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <Widget>
      <Screen ref={screenRef} examResult={examResult} imageCapture={screenIC} type="screen" />
      <Screen ref={cameraRef} examResult={examResult} imageCapture={cameraIC} type="camera" />
      <div style={{fontWeight: 'bold', paddingBottom: 10}}>Time Left {method==='SEPARATE'? `(${brain} Brain)`:''}</div>
      <div style={{display: 'flex', padding: '20px 0px'}}>
        <div className='section'>
          <div className='timeNumber'>{hour}</div>
          <div className='timeUnit'>Hour</div>
        </div>
        <div className='section'>
          <div className='timeNumber'>{minute}</div>
          <div className='timeUnit'>Min</div>
        </div>
        <div className='section'>
          <div className='timeNumber'>{second}</div>
          <div className='timeUnit'>Sec</div>
        </div>
      </div>
      <div style={{fontWeight: 'bold', paddingBottom: 10}}>Question overview</div>
      <Grid container className='section'>
        {states.map((state, index) => (
        <Grid key={index} item>
          <QuestionItem number={index+1} type={state} onClick={handleQuetion} />
        </Grid>
        ))}
      </Grid>
      <Grid container className="section" style={{padding: '50px 30px'}}>
        <Grid item lg={6} xs={12} className="markItem">
          <div className="attempted questionItem mark"></div>
          <div className="markText">Attempted</div>
        </Grid>
        <Grid item lg={6} xs={12} className="markItem">
          <div className="notAttempted questionItem mark"></div>
          <div className="markText">Not attempted</div>
        </Grid>
        <Grid item lg={6} xs={12} className="markItem">
          <div className="reviewed questionItem mark"></div>
          <div className="markText">To be reviewed</div>
        </Grid>
        <Grid item lg={6} xs={12} className="markItem">
          <div className="notView questionItem mark"></div>
          <div className="markText">Not reviewed yet</div>
        </Grid>
      </Grid>
      <div style={{padding: '30px 10px'}}>
        <button className="fullButton" onClick={handleFinish}>Finish</button>
      </div>
    </Widget>
  )
})
export default QuestionView
