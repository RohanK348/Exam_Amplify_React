import React, {useEffect, useState} from 'react'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {useHistory, useParams} from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

import SectionTitle from '../../../../components/section-title'
import {useStyles} from '../../../style/common'
import BasicDetail from './basicDetail'
import AddUser from './addUser'
import ExamSetting from './examSetting'
import Schedule from './schedule'
import { useAsync } from '../../../../functions/utils'
import { useSetting } from "../../../../provider/setting";
import {getExamTypes, getExamMethods} from '../../../../api/enum'
import {update as updateExam, get as getExam} from '../../../../api/exam'
import { getByPaginationFilter as getTemplates, getExams } from '../../../../api/template'
import {getByPagination as getImproveTemplates, getExams as getExamsWithImprove} from '../../../../api/improveTemplate'

const Index = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting();
  const classes = useStyles()
  const history = useHistory()
  const {id} = useParams()
  const [exam, setExam] = useState({})
  const [step, setStep] = useState(0)
  const [methods, setMethods] = useState([])
  const [types, setTypes] = useState([])
  const [fromTemplate, setFromTemplate] = useState(0)
  const [improveTemplates, setImproveTemplates] = useState([]);
  const [fromImprove, setFromImprove] = useState(0);
  const [templates, setTemplates] = useState([])
  const [template, setTemplate] = useState({})
  const [templateType, setTemplateType] = useState("");
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')
  const limit = 10

  const setBasicDetail = (info) => {
    let tmp = exam
    tmp.name = info.name
    tmp.displayType = info.displayType
    tmp.method = info.method
    tmp.type = info.type
    tmp.camera = info.isCamera
    tmp.cameraNumber = info.camera
    tmp.screen = info.isScreen
    tmp.screenNumber = info.screen
    setExam(tmp)
  }
  const setStudents = (info) => {
    let tmp = exam
    tmp.students = info.students
    setExam(tmp)
  }
  const setExamSetting = (info) => {
    let tmp = exam
    if (info.type === 'normal')
      tmp.templateID = info.templateID
    else if (info.type === 'improve')
      tmp.improveTemplateID = info.templateID
    tmp.templateType = info.type
    setTemplateType(info.type)
    setTemplate(info.template)
    setExam(tmp)
  }
  const setSchedule = (info) => {
    let tmp = exam
    tmp.totalTime = info.totalTime
    tmp.rightBrainTime = info.rightBrainTime
    tmp.leftBrainTime = info.leftBrainTime
    tmp.startDate = info.startDate
    tmp.endDate = info.endDate
    tmp.activate = true
    setExam(tmp)
    if (info.isRandom) {
      let tmpExam = {};
      tmpExam.id = id;
      tmpExam.name = exam.name;
      tmpExam.displayType = exam.displayType;
      tmpExam.totalTime = info.totalTime;
      tmpExam.rightBrainTime = info.rightBrainTime;
      tmpExam.leftBrainTime = info.leftBrainTime;
      tmpExam.method = exam.method;
      tmpExam.type = exam.type;
      tmpExam.activate = true;
      tmpExam.camera = exam.camera;
      tmpExam.cameraNumber = exam.cameraNumber;
      tmpExam.screen = exam.screen;
      tmpExam.screenNumber = exam.screenNumber;
      tmpExam.templateID = exam.templateID;
      tmpExam.startDate = info.startDate;
      tmpExam.endDate = info.endDate;
      tmpExam.students = exam.students;
      run(updateExam(tmpExam))
      setAsyncState('update')
    }
    else {
      if (templateType === 'normal')
        run(getExams(tmp.templateID))
      else if (templateType === 'improve')
        run(getExamsWithImprove(tmp.improveTemplateID))
      setAsyncState('getExams')
    }
    setPending(true)
  }
  const nextStep = () => {
    if (exam.type !== 'PRIVATE' && step === 0)
      setStep(2)
    else
      setStep(step + 1)
  }
  const prevStep = () => {
    if (exam.type !== 'PRIVATE' && step === 2)
      setStep(0)
    else
      setStep(step - 1)
  }
  const moreTemplates = async () => {
    let _templates = await getTemplates({or: [{corporateID: {eq: ''}}, {corporateID: {eq: setting?.auth?.corporateID}}]}, limit, fromTemplate)
    _templates = _templates.map((item) => {
      if (item.isSimple) {
        item.totalTime = item?.left?.totalTime + item?.right?.totalTime;
      }
      return item;
    });
    setTemplates([...templates, ..._templates])
    setFromTemplate(fromTemplate + limit)
    const _improveTemplates = await getImproveTemplates(limit, fromImprove);
    setImproveTemplates([...improveTemplates, ..._improveTemplates]);
    setFromImprove(fromTemplate + limit);
  }

  useEffect(() => {
    (async () => {
      const _types = await getExamTypes()
      setTypes(_types)
      const _methods = await getExamMethods()
      setMethods(_methods)
      if (setting?.auth) {
        let _templates = await getTemplates({ or: [{ corporateID: { eq: '' } }, { corporateID: { eq: setting?.auth?.corporateID } }] }, limit, 0)
        _templates = _templates.map((item) => {
          if (item.isSimple) {
            item.totalTime = item?.left?.totalTime + item?.right?.totalTime;
          }
          return item;
        })
        setTemplates(_templates)
        setFromTemplate(limit)
      }
      const _improveTemplates = await getImproveTemplates(limit, 0)
      setImproveTemplates(_improveTemplates)
      setFromImprove(limit)
    })()
  }, [setting?.auth])
  useEffect(() => {
    run(getExam(id))
    setPending(true)
    setAsyncState('getExam')
  }, [run, id])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getExam') {
        setExam(data)
        if (data.templateType === 'normal')
          setTemplate(data.template)
        else if (data.templateType === 'improve')
          setTemplate(data.improveTemplate)
        setAsyncState('')
        setPending(false)
      }
      else if (asyncState === 'getExams') {
        const res = data?.result
        if (res?.rights?.length === 0) {
          NotificationManager.warning(data?.rightMessage, 'Worning', 3000)
          setPending(false)
          setAsyncState('')
        }
        else if (res?.lefts?.length === 0) {
          NotificationManager.warning(data?.leftMessage, 'Worning', 3000)
          setPending(false)
          setAsyncState('')
        }
        else {
          let tmp = {}
          tmp.id = id
          tmp.name = exam.name
          tmp.displayType = exam.displayType
          tmp.totalTime = exam.totalTime
          tmp.rightBrainTime = exam.rightBrainTime
          tmp.leftBrainTime = exam.leftBrainTime
          tmp.right = res?.rights
          tmp.left = res?.lefts
          tmp.method = exam.method
          tmp.type = exam.type
          tmp.activate = exam.activate
          tmp.camera = exam.camera
          tmp.cameraNumber = exam.cameraNumber
          tmp.screen = exam.screen
          tmp.screenNumber = exam.screenNumber
          tmp.templateID = exam.templateID
          tmp.startDate = exam.startDate
          tmp.endDate = exam.endDate
          tmp.students = exam.students
          console.log('update', tmp)
          run(updateExam(tmp))
          setAsyncState('update')
        }
      }
      else if (asyncState === 'update') {
        setPending(false)
        setAsyncState('')
        history.push(`/corporate/opening/detail/${exam.openingID}`)
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
    <SectionTitle title="Corporate" subtitle="Edit new exam" />
    {step===0?
    <BasicDetail exam={exam} methods={methods} types={types} setInfo={setBasicDetail} nextStep={nextStep} />:
    step===1?
    <AddUser exam={exam} setInfo={setStudents} nextStep={nextStep} prevStep={prevStep} />:
    step===2?
    <ExamSetting exam={exam} templates={templates} improveTemplates={improveTemplates} setInfo={setExamSetting} more={moreTemplates} nextStep={nextStep} prevStep={prevStep} />:
    step===3?
    <Schedule exam={exam} template={template} setInfo={setSchedule} nextStep={nextStep} prevStep={prevStep} />:
    ''
    }
  </>
  )
}

export default Index
