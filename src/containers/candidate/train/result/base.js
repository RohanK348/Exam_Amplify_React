import React, {useState, useEffect} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'
import {get as getExamSection} from '../../../../api/examSection'
import {get as getAnswerSection} from '../../../../api/answerSection'
import {useAsync} from '../../../../functions/utils'
import {isEmptyObject} from '../../../../functions/common'
import Question from './question'

const Base = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {step, exam, examResult, nextStep} = props
  // const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [paragraph, setParagraph] = useState({})
  const [questions, setQuestions] = useState([])
  const [type, setType] = useState('')
  const [answers, setAnswers] = useState([])
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const handleNext = () => {
    nextStep()
  }

  useEffect(() => {
    if (!isEmptyObject(exam)) {
      if (exam?.right?.length >= step) {
        run(getExamSection(exam?.right[step-1]))
      }
      else {
        run(getExamSection(exam?.left[step - exam?.right?.length - 1]))
      }
      setAsyncState('getExamSection')
      setPending(true)
    }
  }, [exam, step])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getExamSection') {
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
        if (examResult && !isEmptyObject(examResult)) {
          if (examResult?.right?.length >= step) {
            run(getAnswerSection(examResult?.right[step - 1]))
          }
          else {
            run(getAnswerSection(examResult?.left[step - examResult?.right?.length - 1]))
          }
          setAsyncState('getAnswerSection')
        }
        else {
          setAsyncState('')
          setPending(false)
        }
      }
      else if (asyncState === 'getAnswerSection') {
        if (data?.answers?.length !== 0) {
          setAnswers(data?.answers)
        }
        setAsyncState('')
        setPending(false)
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
      <Grid item xs={12}>
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
              let tmp = answers.filter((item) => item.questionID === question.id)
              let answer = {}
              if (tmp.length !== 0)
                answer = tmp[0]
              return (
                <Question key={index} question={question} answer={answer} index={index} />
              )})}
          </div>
          <div style={{padding: 20, height: 80}}>
            {exam?.right?.length + exam?.left?.length === step?
            <button className={`${classes.button}`} style={{float: 'right'}} onClick={handleNext}>Finish</button>:
            <button className={`${classes.button}`} style={{float: 'right'}} onClick={handleNext}>Next</button>
            }
          </div>
        </Widget>
      </Grid>
    </Grid>
  )
}
export default Base
