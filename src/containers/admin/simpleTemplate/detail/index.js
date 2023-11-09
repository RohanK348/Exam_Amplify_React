import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import SectionTitle from '../../../../components/section-title'
import {get} from '../../../../api/template'
import {useAsync} from '../../../../functions/utils'
import {useStyles} from '../../../style/common'
import {useTemplate} from '../../../../provider/template'
import Save from './save'
import Instruction from '../instruction/index'

const Template = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  const [,dispatch] = useTemplate()
  const classes = useStyles()
  const [pending, setPending] = useState(false)

  useEffect(() => {
    run(get(id))
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (data) {
        dispatch({type: 'SET', name: 'instructions', value: data.instructions})
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
      <SectionTitle title="Template" subtitle="Template Detail" right={<Save templateId={id} />} />
      <Instruction />
    </>
  )
}
export default Template
