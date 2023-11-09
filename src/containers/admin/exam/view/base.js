import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
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
import {useAsync} from '../../../../functions/utils'
import {isEmptyObject} from '../../../../functions/common'
import Question from './question'

const Base = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const history = useHistory()
  const {step, exam, nextStep, prevStep} = props
  const classes = useStyles()
  const [paragraph, setParagraph] = useState({})
  const [questions, setQuestions] = useState([])
  const [type, setType] = useState('')
  const [pending, setPending] = useState(false)

  const handleNext = () => {
    nextStep()
  }
  const handlePrev = () => {
    prevStep()
  }
  const handleFinish = () => {
    history.push(`${process.env.PUBLIC_URL}/admin/exam`)
  }

  useEffect(() => {
    if (!isEmptyObject(exam)) {
      setParagraph({})
      setQuestions([])
      if (exam?.right?.length >= step) {
        run(getExamSection(exam?.right[step-1]))
      }
      else {
        run(getExamSection(exam?.left[step - exam?.right?.length - 1]))
      }
      setPending(true)
    }
  }, [exam, step])
  useEffect(() => {
    if (status === 'resolved') {
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
      setPending(false)
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
              return (
                <Question key={index} question={question} index={index} />
              )})}
          </div>
          <div style={{padding: 20, height: 80}}>
            {step !== 1&&
            <button className={`${classes.button}`} onClick={handlePrev}>Prev</button>
            }
            {exam?.right?.length + exam?.left?.length === step?
            <button className={`${classes.button}`} style={{float: 'right'}} onClick={handleFinish}>Finish</button>:
            <button className={`${classes.button}`} style={{float: 'right'}} onClick={handleNext}>Next</button>
            }
          </div>
        </Widget>
      </Grid>
    </Grid>
  )
}
export default Base
