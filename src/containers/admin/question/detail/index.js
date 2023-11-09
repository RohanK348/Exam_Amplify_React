import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import SectionTitle from '../../../../components/section-title'
import {get} from '../../../../api/question'
import {useAsync} from '../../../../functions/utils'
import {useStyles} from '../../../style/common'
import {useQuestion} from '../../../../provider/question'
import Save from './save'
import Tag from '../tag/index'
import Attribute from '../attribute/index'
import Option from '../option/index'

const Question = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  const [,dispatch] = useQuestion()
  const classes = useStyles()
  const [question, setQuestion] = useState({})
  const [pending, setPending] = useState(false)

  useEffect(() => {
    run(get(id))
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (data) {
        setQuestion(data)
        dispatch({type: 'SET', name: 'tags', value: data.tags})
        dispatch({type: 'SET', name: 'attributes', value: data.attributes})
      }
      setPending(false)
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
      <SectionTitle title="Question" subtitle="Question Detail" right={<Save questionId={id} subtopicId={question?.subTopicID} />} />
      <Option questionId={id} questionType={question?.type} />
      <Tag />
      <Attribute />
    </>
  )
}
export default Question
