import React, {useState, useEffect} from 'react'
import {
  Grid,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'
import Template from '../template'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  }
}))
const ExamSetting = (props) => {
  const {exam, templates, improveTemplates, more, setInfo, nextStep, prevStep} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [templateId, setTemplateId] = useState('')
  const [template, setTemplate] = useState({})
  const [type, setType] = useState("");

  const handlePrev = () => {
    prevStep()
  }
  const handleContinue = () => {
    if (templateId === '') {
      NotificationManager.warning('Please select template', 'Worning', 3000);
      return
    }
    setInfo({
      templateID: templateId,
      template: template,
      type: type
    })
    nextStep()
  }
  const changeSelect = (item, t) => {
    setTemplateId(item.id)
    setTemplate(item)
    setType(t)
  }

  useEffect(() => {
    if (exam.templateType === 'normal') {
      setTemplateId(exam?.templateID || '')
      setTemplate(exam?.template)
    }
    else if (exam.templateType === 'improve') {
      setTemplateId(exam?.improveTemplateID || '')
      setTemplate(exam?.improveTemplate)
    }
  }, [exam])
  return (
    <Widget
      title=""
      description={
        <span>
          Exam Settings
        </span>
      }>
      <Grid container spacing={2}>
        {templates.map((item) => (
        <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
          <Template item={item} activate={item.id===templateId} type="normal" changeSelect={changeSelect} />
        </Grid>
        ))}
        {improveTemplates.map((item) => (
        <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
          <Template item={item} activate={item.id===templateId} type="improve" changeSelect={changeSelect} />
        </Grid>
        ))}
        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <Button style={{marginTop: 10}} variant="outlined" onClick={more}>View More</Button>
        </Grid>
        <Grid item xs={12} style={{height: 150, paddingTop: 50}}>
          <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handlePrev}>Cancel</button>
          <button className={classes.button} style={{float: 'right'}} onClick={handleContinue}>Save <span>&#38;</span> Continue</button>
        </Grid>
      </Grid>
    </Widget>
  )
}
export default ExamSetting
