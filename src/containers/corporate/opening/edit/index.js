import React, {useState, useEffect} from 'react'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {useParams, useHistory} from 'react-router-dom'

import SectionTitle from '../../../../components/section-title'
import {useStyles} from '../../../style/common'
import BasicDetail from './basicDetail'
import TargetSetting from './targetSetting'
import Schedule from './schedule'
import Final from './final'
import {useAsync} from '../../../../functions/utils'
import {update, get} from '../../../../api/opening'
import {useSetting} from '../../../../provider/setting'

const Index = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  const history = useHistory()
  const [setting] = useSetting()
  const classes = useStyles()
  const [opening, setOpening] = useState({})
  const [step, setStep] = useState(0)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const setBasicDetail = (info) => {
    let tmp = opening
    tmp.title = info.title
    tmp.vacancy = info.vacancy
    tmp.description = info.description
    setOpening(tmp)
  }
  const setTargetSetting = (info) => {
    let tmp = opening
    tmp.courses = info.courses
    tmp.specialisations = info.specialisations
    tmp.domains = info.domains
    tmp.years = info.years
    tmp.EAScore = info.EAScore
    setOpening(tmp)
  }
  const setSchedule = (info) => {
    let tmp = opening
    tmp.ExpiryDate = info.ExpiryDate
    tmp.corporateID = setting?.auth?.corporateID
    setOpening(tmp)
    let newTmp = {}
    newTmp.id = id
    newTmp.title = tmp.title
    newTmp.vacancy = tmp.vacancy
    newTmp.description = tmp.description
    newTmp.courses = tmp.courses
    newTmp.specialisations = tmp.specialisations
    newTmp.domains = tmp.domains
    newTmp.years = tmp.years
    newTmp.EAScore = tmp.EAScore
    newTmp.ExpiryDate = tmp.ExpiryDate
    run(update(newTmp))
    setAsyncState('update')
    setPending(true)
  }
  const nextStep = () => {
    setStep(step + 1)
  }
  const prevStep = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    run(get(id))
    setAsyncState('get')
    setPending(true)
  }, [run, id])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'update') {
        setPending(false)
        history.push('/corporate/opening')
      }
      else if (asyncState === 'get') {
        console.log(data)
        setOpening(data)
        setPending(false)
      }
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
    <SectionTitle title="Corporate" subtitle="Create new opening" />
    {step===0?
    <BasicDetail opening={opening} setInfo={setBasicDetail} nextStep={nextStep} />:
    step===1?
    <TargetSetting opening={opening} setInfo={setTargetSetting} nextStep={nextStep} prevStep={prevStep} />:
    step===2?
    <Schedule opening={opening} setInfo={setSchedule} nextStep={nextStep} prevStep={prevStep} />:
    <Final opening={opening} />
    }
  </>
  )
}

export default Index
