import React, {useState, useEffect} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {useParams} from 'react-router-dom'

import SectionTitle from '../../../../components/section-title'
import {useStyles} from '../../../style/common'
import {get as getExam} from '../../../../api/exam'
import {useAsync} from '../../../../functions/utils'
import '../../../candidate/style/index.css'
import Base from './base'

const ExamView = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  const classes = useStyles()
  const [exam, setExam] = useState({})
  const [step, setStep] = useState(1)
  const [pending, setPending] = useState(false)

  const nextStep = () => {
    let questionLength = exam?.right?.length + exam?.left?.length
    setStep(Math.min(step + 1, questionLength))
  }
  const prevStep = () => {
    setStep(Math.max(step - 1, 0))
  }

  useEffect(() => {
    run(getExam(id))
    setPending(true)
  }, [id])
  useEffect(() => {
    if (status === 'resolved') {
      setExam(data)
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
      <SectionTitle title="Exam View" subtitle={exam?.name} />
      <Base step={step} exam={exam} nextStep={nextStep} prevStep={prevStep} />
    </>
  )
}
export default ExamView
