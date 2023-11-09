import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Grid,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'
import Template from '../components/template'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  }
}))
const Templates = (props) => {
  const {template, templates, more, setInfo, nextStep} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [templateId, setTemplateId] = useState('')
  const [selectTemplate, setSelectTemplate] = useState({})

  const handleContinue = () => {
    if (templateId === '') {
      NotificationManager.warning('Please select template', 'Worning', 3000);
      return
    }
    setInfo(selectTemplate)
    nextStep()
  }
  const changeSelect = (item) => {
    setTemplateId(item.id)
    setSelectTemplate(item)
  }

  useEffect(() => {
    setSelectTemplate(template)
    setTemplateId(template?.id || '')
  }, [template])
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
          <Template item={item} activate={item.id===templateId} type="improve" changeSelect={changeSelect} />
        </Grid>
        ))}
        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <Button style={{marginTop: 10}} variant="outlined" onClick={more}>View More</Button>
        </Grid>
        <Grid item xs={12} style={{ height: 150, paddingTop: 50 }}>
          <Link to={`/corporate/improveTemplate`} style={{textDecoration: 'none'}}>
            <button className={`${classes.button} ${customeClasses.cancel}`} >Cancel</button>
          </Link>
          <button className={classes.button} style={{float: 'right'}} onClick={handleContinue}>Save <span>&#38;</span> Continue</button>
        </Grid>
      </Grid>
    </Widget>
  )
}
export default Templates
