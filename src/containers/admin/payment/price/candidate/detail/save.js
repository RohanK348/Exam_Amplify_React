import React, {useState, useEffect} from 'react'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Link, useHistory} from 'react-router-dom'

import {useStyles} from '../../../../../style/common'
import {useAsync} from '../../../../../../functions/utils'
import {update} from '../../../../../../api/priceCandidate'
import {usePriceCandidate} from '../../../../../../provider/priceCandidate'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))

const SaveDetail = (props) => {
  const {status, error, run} = useAsync({
    status: 'idle',
  })
  const history = useHistory()
  const [priceCandidate] = usePriceCandidate()
  const customeClasses = useCustomStyles()
  const classes = useStyles();
  const {id} = props
  const [pending, setPending] = useState(false)

  const handleSave = () => {
    let tmp = {}
    tmp.id = id
    if (priceCandidate.details)
      tmp.details = priceCandidate.details
    run(update(tmp))
    setPending(true)
  }

  useEffect(() => {
    if (status === 'resolved') {
      setPending(false)
      history.push(`${process.env.PUBLIC_URL}/admin/candidate/price`)
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
    <div>
      <Link to={`${process.env.PUBLIC_URL}/admin/candidate/price`} style={{textDecoration: 'none'}}>
        <button className={`${classes.button} ${customeClasses.cancel}`}>Cancel</button>
      </Link>
      <button className={classes.button} onClick={handleSave}>Save</button>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  )
}
export default SaveDetail
