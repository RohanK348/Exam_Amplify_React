import React, {useState, useEffect} from 'react'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import SectionTitle from '../../../../components/section-title'
import {useStyles} from '../../../style/common'
import BasicDetail from './basicDetail'
import TargetSetting from './targetSetting'
import Schedule from './schedule'
import Final from './final'
import {useAsync} from '../../../../functions/utils'
import {create} from '../../../../api/opening'
import {useSetting} from '../../../../provider/setting'

const Index = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const classes = useStyles()
  const [opening, setOpening] = useState({})
  const [step, setStep] = useState(0)
  const [pending, setPending] = useState(false)

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
    tmp.year = info.year
    tmp.EAScore = info.EAScore
    setOpening(tmp)
  }
  const setSchedule = (info) => {
    let tmp = opening
    tmp.ExpiryDate = info.ExpiryDate
    tmp.corporateID = setting?.auth?.corporateID
    setOpening(tmp)
    run(create(tmp))
    setPending(true)
  }
  const nextStep = () => {
    setStep(step + 1)
  }
  const prevStep = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    if (status === 'resolved') {
      setOpening(data)
      setPending(false)
      nextStep()
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
