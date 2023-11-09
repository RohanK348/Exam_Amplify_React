import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import SectionTitle from '../../../../components/section-title'
import Setting from './setting'
import { get as getTemplate, update as updateTemplate } from '../../../../api/improveTemplate'
import { update as updateAttribute} from '../../../../api/attribute'

const Index = () => {
  const history = useHistory()
  const {id} = useParams()
  const [template, setTemplate] = useState({})

  const changeSetting = async (info) => {
    let tmp = {}
    tmp.id = template.id
    tmp.name = info.name
    const res = await updateTemplate(tmp)
    const attributes = info.attributes
    await Promise.all(attributes.map(async (attribute) => {
      let tmp = {
        id: attribute.id,
        value: attribute.value,
      }
      await updateAttribute(tmp)
    }))
    history.push("/corporate/improveTemplate")
  }

  useEffect(() => {
    (async () => {
      const _template = await getTemplate(id)
      setTemplate(_template)
    })()
  }, [id])
  return (
  <>
    <SectionTitle title="Corporate" subtitle="Update improve template" />
    <Setting template={template} setInfo={changeSetting} />
  </>
  )
}

export default Index
