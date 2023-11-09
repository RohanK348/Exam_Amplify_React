import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

import SectionTitle from '../../../../components/section-title'
import Setting from './setting'
import Templates from './templates'
import {useSetting} from '../../../../provider/setting'
import { getByPaginationFilter as getTemplates, create as createTemplate } from '../../../../api/improveTemplate'
import { create as createAttribute } from '../../../../api/attribute'
import { create as createPersonality } from '../../../../api/personality'
import { create as createTopic} from '../../../../api/improveTemplateTopic'

const Index = () => {
  const [setting] = useSetting()
  const history = useHistory()
  const [template, setTemplate] = useState({})
  const [step, setStep] = useState(0)
  const [from, setFrom] = useState(0)
  const [templates, setTemplates] = useState([])
  const limit = 10

  const changeTemplate = (_template) => {
    console.log(_template)
    setTemplate(_template)
  }
  const changeSetting = async (info) => {
    let tmp = {}
    tmp.name = info.name
    tmp.description = template.description
    tmp.departmentID = template.departmentID
    tmp.totalTime = template.totalTime
    tmp.activate = true
    tmp.publish = true
    tmp.corporateID = setting?.auth?.corporateID
    const res = await createTemplate(tmp)
    const attributes = info.attributes
    await Promise.all(attributes.map(async (attribute) => {
      let tmp = {
        key: attribute.key,
        name: attribute.name,
        value: attribute.value,
        editable: attribute.editable,
        base: attribute.base,
        improveTemplateID: res.id
      }
      await createAttribute(tmp)
    }))
    const personalities = template?.personalities?.items
    await Promise.all(personalities.map(async (personality) => {
      let tmp = {
        name: personality.name,
        min: personality.min,
        max: personality.max,
        improveTemplateID: res.id,
      }
      await createPersonality(tmp)
    }))
    const topics = template?.topics?.items
    await Promise.all(topics.map(async (topic) => {
      let tmp = {
        topicID: topic.topicID,
        brain: topic.brain,
        number: topic.number,
        complexity: topic.complexity,
        min: topic.min,
        avg: topic.avg,
        max: topic.max,
        improveTemplateID: res.id,
      }
      await createTopic(tmp)
    }))
    history.push("/corporate/improveTemplate")
  }
  const nextStep = () => {
    setStep(step + 1)
  }
  const prevStep = () => {
    setStep(step - 1)
  }
  const moreTemplates = async () => {
    let _templates = await getTemplates({corporateID: {eq: ''}}, limit, from)
    setTemplates([...templates, ..._templates])
    setFrom(from + limit)
  }

  useEffect(() => {
    (async () => {
      let _templates = await getTemplates({corporateID: { eq: '' } }, limit, 0)
      setTemplates(_templates)
      setFrom(limit)
    })()
  }, [])
  return (
  <>
    <SectionTitle title="Corporate" subtitle="Create improve template from admin" />
    {step===0?
    <Templates template={template} templates={templates} setInfo={changeTemplate} nextStep={nextStep} more={moreTemplates} />:
    step===1?
    <Setting template={template} setInfo={changeSetting} prevStep={prevStep} />:
    ''
    }
  </>
  )
}

export default Index
