import React, {useState} from 'react'
import {
  IconButton,
} from '@material-ui/core'
import {Delete as DeleteIcon} from '@material-ui/icons'

import {useTemplate} from '../../../../provider/template'
import {useStyles} from '../../../style/common'
import DeleteConfirm from '../../../../components/DeleteConfirm'

const Delete = (props) => {
  const {index} = props
  const [template, dispatch] = useTemplate()
  const classes = useStyles()
  const [acitiveConfirm, setActiveConfirm] = useState(false)

  const handleDelete = () => {
    setActiveConfirm(true)
  }
  const deleteConfirm = (res) => {
    setActiveConfirm(false)
    if (res) {
      let instructions = template.instructions
      instructions = [...instructions.slice(0, index), ...instructions.slice(index + 1)]
      dispatch({type: 'SET', name: 'instructions', value: instructions})
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
