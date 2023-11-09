import React, {useState, useEffect, useRef} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {Beenhere, Save, Cancel} from '@material-ui/icons'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { makeStyles } from '@material-ui/core/styles'

import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'
import {getSecure as getExamSection} from '../../../../api/examSection'
import {get as getAnswerSection, update as updateAnswerSection} from '../../../../api/answerSection'
import {updateSome as updateAnswers} from '../../../../api/answer'
import {examEvaluation} from '../../../../api/examResult'
import Confirm from '../../../../components/Confirm'
import {useAsync} from '../../../../functions/utils'
import {isEmptyObject} from '../../../../functions/common'
import '../style/index.css'
import Question from './question'
import QuestionView from './questionView'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  }
}))

const Base = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {exam, examResult, step, screenIC, cameraIC, cameraTrack, nextStep, prevStep, changeStep, setResult} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const viewRef = useRef()
  const [brain, setBrain] = useState('right')
  const [paragraph, setParagraph] = useState({})
  const [questions, setQuestions] = useState([])
  const [type, setType] = useState('')
  const [answerSection, setAnswerSection] = useState({})
  const [state, setState] = useState('notAttempted')
  const [answers, setAnswers] = useState([])
  const [isNext, setIsNext] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [confirmNextActive, setConfirmNextActive] = useState(false)
  const [confirmFinishActive, setConfirmFinishActive] = useState(false)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const handleNext = () => {
    if (exam?.method === 'SEPARATE' && exam?.right?.length === step) {
      setConfirmNextActive(true)
    }
    else {
      if (isSaved) {
        nextStep()
        return
      }
      setIsNext(true)
      handleSave()
    }
  }
  const handlePrev = () => {
    prevStep()
  }
  const setAnswer = (questionId, answer) => {
    setState('attempted')
    answers.forEach((item) => {
      if (item.questionID === questionId) {
        item.answerOptions = answer.answerOptions
      }
    })
    setAnswers(answers)
    setIsSaved(false)
  }
  const handleSave = () => {
    let tmp = answers.map((answer) => {
      return {
        id: answer.id,
        questionID: answer.questionID,
        answerOptions: answer.answerOptions,
      }
    })
    run(updateAnswers(tmp))
    setAsyncState('updateAnswers')
    setPending(true)
  }
  const handleClear = () => {
    let tmp = answers.map((answer) => {
      answer.answerOptions = []
      return answer
    })
    setAnswers(tmp)
    setState('notAttempted')
    tmp = answers.map((answer) => {
      return {
        id: answer.id,
        questionID: answer.questionID,
        answerOptions: [],
      }
    })
    run(updateAnswers(tmp))
    setAsyncState('updateAnswers')
    setPending(true)
  }
  const handleReviewLater = () => {
    let tmp = {}
    tmp.id = answerSection.id
    tmp.state = 'reviewed'
    run(updateAnswerSection(tmp))
    setState('reviewed')
    setPending(true)
    setAsyncState('updateAnswerSection')
  }
  const handleFinish = () => {
    setConfirmFinishActive(true)
  }
  const confirmNext = (res) => {
    setConfirmNextActive(false)
    if (res) {
      if (isSaved) {
        nextStep()
        return
      }
      setIsNext(true)
      handleSave()
    }
  }
  const confirmFinish = (res) => {
    setConfirmFinishActive(false)
    if (res) {
      finish()
    }
  }
  const finish = () => {
    if (!isEmptyObject(cameraTrack)) {
      console.log('camera stop')
      cameraTrack.stop()
    }
    if (isSaved) {
      run(examEvaluation(examResult.id))
      setPending(true)
      setAsyncState('examEvaluation')
    }
    else {
      setIsFinish(true)
      handleSave()
    }
  }

  useEffect(() => {
    console.log('step', step)
    setQuestions([])
    setParagraph({})
    if (exam?.right?.length >= step) {
      setBrain('right')
      run(getExamSection(exam?.right[step-1]))
      console.log('right', exam?.right[step-1])
    }
    else {
      setBrain('left')
      run(getExamSection(exam?.left[step - exam?.right?.length - 1]))
      console.log('left', exam?.left[step - exam?.right?.length - 1])
    }
    setPending(true)
    setAsyncState('getExamSection')
  }, [exam, step])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getExamSection') {
        console.log('exam section', data)
        setQuestions(data?.questions)
        if (data?.type === 'PARAGRAPH') {
          setParagraph(data?.paragraph)
          setType("Paragraph")
        }
        else if (data?.type === 'SINGLE') {
          setType("Single choice type question")
        }
        else if (data?.type === 'MULTIFUL') {
          setType("Multipul choice type question")
        }
        if (examResult?.right?.length >= step) {
          run(getAnswerSection(examResult?.right[step - 1]))
        }
        else {
          run(getAnswerSection(examResult?.left[step - examResult?.right?.length - 1]))
        }
        setAsyncState('getAnswerSection')
      }
      else if (asyncState === 'getAnswerSection') {
        setAnswerSection(data)
        console.log('answerr sectoin', data)
        if (data?.answers?.length !== 0) {
          setAnswers(data?.answers)
        }
        setAsyncState('')
        setPending(false)
      }
      else if (asyncState === 'updateAnswers') {
        let tmp = {}
        tmp.id = answerSection.id
        tmp.state = state
        run(updateAnswerSection(tmp))
        setAsyncState('updateAnswerSection')
      }
      else if (asyncState === 'updateAnswerSection') {
        viewRef.current.changeState(step, state)
        setPending(false)
        setAsyncState('')
        if (isNext) {
          nextStep()
          setIsNext(false)
        }
        if (isFinish) { 
          run(examEvaluation(examResult.id))
          setPending(true)
          setAsyncState('examEvaluation')
        }
        setIsSaved(true)
      }
      else if (asyncState === 'examEvaluation') {
        setResult(data?.body?.mark)
        setPending(false)
        setAsyncState('')
      }
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
    <Grid container spacing={3}>
      <Confirm open={confirmNextActive} callback={confirmNext} title="Confirm Next" description="Do you want to go next brain?" />
      <Confirm open={confirmFinishActive} callback={confirmFinish} title="Confirm Finish" description="Do you want to finish this exam before timeout?" />
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Grid item lg={9} md={8} xs={12}>
        <Widget
          title=""
          description={
            <span>
              Question {step}
            </span>
          }
          right={
            <div>
              {type}
            </div>
          }>
          {paragraph?.description &&
          <SunEditor
            defaultValue={paragraph?.description}
            disable={true}
            hideToolbar
            setDefaultStyle="height: auto"
          />
          }
          <div style={{minHeight: 650}}>
            {questions.map((question, index) => {
              let answer = {}
              if (answers.length !== 0) {
                let tmp = answers?.filter((item) => item.questionID === question.id)
                if (tmp.length !== 0)
                  answer = tmp[0]
              }
              return (
              <Question key={index} type={type} question={question} answer={answer} index={index} setAnswer={setAnswer} />
            )})}
          </div>
          <div style={{display: 'flex', justifyContent: 'center', padding: 20}}>
            {(step!==1&&exam?.type==='BACK_ENABLED')&&
              <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handlePrev} >Previous</button>
            }
            <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handleSave}>
              <Save className="mr-2" />Save
            </button>
            <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handleReviewLater}>
              <Beenhere className="mr-2" />Review Later
            </button>
            <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handleClear}>
              <Cancel className="mr-2" />Clear Selection
            </button>
            {exam?.right?.length + exam?.left?.length === step?
            <button className={`${classes.button}`} style={{float: 'right'}} onClick={handleFinish}>Finish</button>:
            <button className={`${classes.button}`} style={{float: 'right'}} onClick={handleNext}>Next</button>
            }
          </div>
        </Widget>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <QuestionView 
          ref={viewRef} 
          examResult={examResult} 
          screenIC={screenIC}
          cameraIC={cameraIC}
          brain={brain} 
          changeStep={changeStep} 
          handleFinish={handleFinish}
          finish={finish} 
        />
      </Grid>
    </Grid>
  )
}
export default Base
