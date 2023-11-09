import React, {useState} from 'react'
import {
  IconButton,
} from '@material-ui/core'
import {Delete as DeleteIcon} from '@material-ui/icons'

import {usePriceCandidate} from '../../../../../../provider/priceCandidate'
import {useStyles} from '../../../../../style/common'
import DeleteConfirm from '../../../../../../components/DeleteConfirm'

const Delete = (props) => {
  const {index} = props
  const [priceCandidate, dispatch] = usePriceCandidate()
  const classes = useStyles()
  const [acitiveConfirm, setActiveConfirm] = useState(false)

  const handleDelete = () => {
    setActiveConfirm(true)
  }
  const deleteConfirm = (res) => {
    setActiveConfirm(false)
    if (res) {
      let details = priceCandidate.details
      details = [...details.slice(0, index), ...details.slice(index + 1)]
      dispatch({type: 'SET', name: 'details', value: details})
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
