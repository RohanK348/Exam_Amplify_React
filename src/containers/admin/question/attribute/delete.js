import React, {useState} from 'react'
import {
  IconButton,
} from '@material-ui/core'
import {Delete as DeleteIcon} from '@material-ui/icons'

import {useQuestion} from '../../../../provider/question'
import {useStyles} from '../../../style/common'
import DeleteConfirm from '../../../../components/DeleteConfirm'

const Delete = (props) => {
  const {index} = props
  const [question, dispatch] = useQuestion()
  const classes = useStyles()
  const [acitiveConfirm, setActiveConfirm] = useState(false)

  const handleDelete = () => {
    setActiveConfirm(true)
  }
  const deleteConfirm = (res) => {
    setActiveConfirm(false)
    if (res) {
      let attributes = question.attributes
      attributes = [...attributes.slice(0, index), ...attributes.slice(index + 1)]
      dispatch({type: 'SET', name: 'attributes', value: attributes})
    }
  }

  return (
    <>
      <DeleteConfirm open={acitiveConfirm} callback={deleteConfirm} />
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon className={classes.icon} />
      </IconButton>
    </>
  )
}
export default Delete
