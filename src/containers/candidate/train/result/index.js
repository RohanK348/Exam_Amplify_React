import React, {useState, useEffect} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {useParams} from 'react-router-dom'

import SectionTitle from '../../../../components/section-title'
import {useStyles} from '../../../style/common'
import {get as getTrain, update as updateTrain} from '../../../../api/train'
import {useAsync} from '../../../../functions/utils'
import {isEmptyObject} from '../../../../functions/common'
import '../../style/index.css'
import Base from './base'
import Final from './final'

const TrainResult = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  // const [setting] = useSetting()
  // const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [exam, setExam] = useState({})
  const [examResult, setExamResult] = useState({})
  const [train, setTrain] = useState({})
  const [step, setStep] = useState(1)
  const [isFinal, setIsFinal] = useState(false)
  const [result, setResult] = useState(0)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const nextStep = () => {
    let tmp = {}
    tmp.id = train.id
    tmp.resultShowIndex = step + 1
    run(updateTrain(tmp))
    setAsyncState('updateTrain')
    setPending(true)
  }

  useEffect(() => {
    if (!isEmptyObject(exam)) {
      if (exam?.right?.length + exam?.left?.length < step)
        setIsFinal(true)
      else
        setIsFinal(false)
    }
  }, [step, exam])
  useEffect(() => {
    run(getTrain(id))
    setAsyncState('getTrain')
    setPending(true)
  }, [id])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getTrain') {
        console.log(data)
        setTrain(data)
        setStep(data.resultShowIndex)
        setExam(data.exam)
        setExamResult(data.examResult)
        setResult(data?.examResult?.percentage||0)
        setPending(false)
        setAsyncState('')
      }
      else if (asyncState === 'updateTrain') {
        setStep(step + 1)
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
      <SectionTitle title="Train Result" subtitle={exam?.name} />
      {isFinal?
      <Final result={result} />:
      <Base step={step} exam={exam} examResult={examResult} nextStep={nextStep}  />
      }
    </Grid>
  )
}
export default TrainResult
