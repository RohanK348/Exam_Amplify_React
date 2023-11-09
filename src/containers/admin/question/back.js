import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import {useAsync} from '../../../functions/utils'
import {get} from '../../../api/subtopic'
import {useStyles} from '../../style/common'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))

const Back = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [topicId, setTopicId] = useState('')

  useEffect(() => {
    run(get(id))
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      setTopicId(data?.topicID)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])

  return (
    <Link to={`/admin/topic/${topicId}`} style={{textDecoration: 'none'}}>
      <button className={`${classes.button} ${customeClasses.cancel}`} color="inherit" variant="outlined" >
        Back
      </button>
    </Link>
  )
}
export default Back
