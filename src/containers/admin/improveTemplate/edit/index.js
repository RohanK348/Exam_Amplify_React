import React, {useEffect, useState, useRef} from 'react'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {useParams, useHistory} from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import { Publish as PublishIcon } from '@material-ui/icons'

import SectionTitle from '../../../../components/section-title'
import {useStyles} from '../../../style/common'
import BasicDetail from './basicDetail'
import Brain from './brain'
import Personalities from './personalities'
import Attributes from './attributes'
import Publish from './publish'
import Final from './final'
import {useAsync} from '../../../../functions/utils'
import {useImproveTemplate} from '../../../../provider/improveTemplate'
import { get, update as updateTemplate } from '../../../../api/improveTemplate'
import { create as createTopic, remove as deleteTopic, update as updateTopic } from '../../../../api/improveTemplateTopic'
import { create as createPersonality, remove as deletePersonality, update as updatePersonality} from '../../../../api/personality'
import { getComplexityTypes } from '../../../../api/enum'

const Index = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const history = useHistory()
  const finalRef = useRef()
  const [improveTemplate, dispatch] = useImproveTemplate()
  const classes = useStyles()
  const {id} = useParams()
  const [template, setTemplate] = useState({})
  const [step, setStep] = useState(0)
  const [complexityTypes, setComplexityTypes] = useState([])
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')
  const limit = 10

  const nextStep = () => {
    setStep(step + 1)
  }
  const prevStep = () => {
    setStep(step - 1)
  }
  const handlePublish = async () => {
    await finalRef.current.save()
    await updateTemplate({
      id: id,
      publish: true, 
    })
    history.push(`/admin/department/${template?.departmentID}`);
  }
  const handleSave = async () => {
    let tmp = { id: id }
    tmp.description = improveTemplate?.description
    await updateTemplate(tmp)
    await Promise.all(improveTemplate?.newTopics?.map( async (topic) => {
      await createTopic(topic)
    }))
    let topics = [...improveTemplate?.rightTopics, ...improveTemplate?.leftTopics]
    await Promise.all(topics?.map(async (topic) => {
      if (topic.id) {
        let tmp = {
          id: topic.id,
          topicID: topic.topicID,
          number: topic.number,
          max: topic.max,
          avg: topic.avg,
          min: topic.min,
          complexity: topic.complexity
        }
        await updateTopic(tmp)
      }
    }))
    await Promise.all(improveTemplate?.deleteTopics?.map(async (topic) => {
      await deleteTopic(topic.id)
    }))
    await Promise.all(improveTemplate?.newPersonalities?.map( async (personality) => {
      await createPersonality(personality)
    }))
    await Promise.all(improveTemplate?.personalities?.map(async (personality) => {
      if (personality.id) {
        let tmp = {
          id: personality.id,
          name: personality.name,
          min: personality.min,
          max: personality.max
        }
        await updatePersonality(tmp)
      }
    }))
    await Promise.all(improveTemplate?.deletePersonalities?.map(async (personality) => {
      await deletePersonality(personality.id)
    }))
    NotificationManager.success("You changing is updated successfully.", "Success", 3000);
  }

  useEffect(() => {
    (async () => {
      const data = await getComplexityTypes()
      setComplexityTypes(data)
    })()
  }, [])
  useEffect(() => {
    if (id) {
      run(get(id))
      setPending(true)
      setAsyncState('get')
    }
  }, [run, id])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'get') {
        setTemplate(data)
        dispatch({ type: 'SET', name: 'name', value: data?.name })
        dispatch({ type: 'SET', name: 'description', value: data?.description })
        dispatch({ type: 'SET', name: 'publish', value: data?.publish})
        const topics = data?.topics?.items || [];
        const rTopics = topics.filter((item) => item?.brain === "right");
        dispatch({ type: 'SET', name: 'rightTopics', value: rTopics })
        const lTopics = topics.filter((item) => item?.brain === "left");
        dispatch({ type: "SET", name: "leftTopics", value: lTopics });
        dispatch({ type: 'SET', name: 'newTopics', value: [] })
        dispatch({ type: 'SET', name: 'deleteTopics', value: [] })
        dispatch({ type: 'SET', name: 'personalities', value: data?.personalities?.items || [] })
        dispatch({ type: "SET", name: "newPersonalities", value: [] });
        dispatch({ type: 'SET', name: 'deletePersonalities', value: [] })
        const attributes = data?.attributes?.items
        const baseAttributes = attributes.filter((item) => item.base === true)
        let baseAttributeObj = {}
        baseAttributes.forEach((item) => {
          baseAttributeObj[item.key] = item
        })
        dispatch({ type: 'SET', name: 'baseAttributes', value: baseAttributeObj })
        dispatch({ type: "SET", name: 'newAttributes', value: [] })
        dispatch({ type: "SET", name: 'deleteAttributes', value: []})
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
      <Backdrop
        className={classes.backdrop}
        open={pending}
        style={{ zIndex: 9999 }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <SectionTitle
        title="Template"
        subtitle={`${template?.department?.name || ""} Department`}
        right={step === 5 &&
          <button
            className={classes.button}
            style={{ float: "right" }}
            onClick={handlePublish}
          >
            <PublishIcon className="mr-2" />
            Publish
          </button>
        }
      />
      {step === 0 ? (
        <BasicDetail
          departmentId={template?.departmentID}
          nextStep={nextStep}
        />
      ) : step === 1 ? (
        <Brain
          complexityTypes={complexityTypes}
          templateId={template?.id}
          nextStep={nextStep}
          prevStep={prevStep}
          setStep={setStep}
        />
      ) : step === 2 ? (
        <Personalities
          templateId={template?.id}
          nextStep={nextStep}
          prevStep={prevStep}
          setStep={setStep}
        />
      ) : step === 3 ? (
        <Attributes
          templateId={template?.id}
          nextStep={nextStep}
          prevStep={prevStep}
          setStep={setStep}
        />
      ) : step === 4 ? (
        <Publish
          nextStep={nextStep}
          prevStep={prevStep}
          setStep={setStep}
          handleSave={handleSave}
        />
      ) : step === 5 ? (
        <Final
          ref={finalRef}
          templateId={template?.id}
          prevStep={prevStep}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Index
