import React, {useState, useEffect} from 'react'
import {
  Grid,
  Button,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import { getByPagination as getTemplates } from '../../../api/template'
import {getByPagination as getImproveTemplates} from '../../../api/improveTemplate'
import {useStyles} from '../../style/common'
import Template from './template'

const Train = () => {
  const classes = useStyles()
  const [fromTemplate , setFromTemplate] = useState(0)
  const [templates, setTemplates] = useState([])
  const [improveTemplates, setImproveTemplates] = useState([]);
  const [fromImprove, setFromImprove] = useState(0);
  const limit = 10

  const loadMore = async () => {
    const _templates = await getTemplates(limit, fromTemplate)
    setTemplates([...templates, ..._templates])
    setFromTemplate(fromTemplate + limit)
    const _improveTemplates = await getImproveTemplates(limit, fromImprove)
    setImproveTemplates([...improveTemplates, ..._improveTemplates])
    setFromImprove(fromImprove + limit)
  }

  useEffect(() => {
    (async () => {
      const _templates = await getTemplates(limit, 0)
      setTemplates(_templates)
      setFromTemplate(limit)
      const _improveTemplates = await getImproveTemplates(limit, 0)
      setImproveTemplates(_improveTemplates)
      setFromImprove(limit)
    })()
  }, [])
  return (
    <>
      <SectionTitle title="Train" subtitle="Train" />
      <Widget
        title="Template"
        description={
          <span>
            Here are templates
          </span>
        }>
        <Grid container spacing={2}>
          {templates.map((item) => (
          <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
            <Template item={item} type="normal" />
          </Grid>
          ))}
          {improveTemplates.map((item) => (
          <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
            <Template item={item} type="improve" />
          </Grid>
          ))}
          <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
            <Button style={{marginTop: 10}} variant="outlined" onClick={loadMore}>View More</Button>
          </Grid>
        </Grid>
      </Widget>
    </>
  )
}
export default Train
