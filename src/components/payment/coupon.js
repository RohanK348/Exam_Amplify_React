import React, {useState, useEffect} from 'react'
import { NotificationManager } from 'react-notifications';
import { makeStyles } from '@material-ui/core/styles'

import { useAsync } from '../../functions/utils'

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    fontSize: 15,
    color: 'white',
    backgroundColor: '#1A2245',
    padding: '8px 20px',
    borderRadius: 5,
  },
}))
const Coupon = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {priceId, result, get, remove} = props
  const classes = useStyles()
  const [code, setCode] = useState('')
  const [coupon, setCoupon] = useState({})
  const [asyncState, setAsyncState] = useState('')

  const validate = () => {
    let res = true
    if (code === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input code field', 'Worning', 3000);
    return res
  }
  const handleSubmit = () => {
    if (validate()){
      console.log(priceId)
      console.log(code)
      run(get({priceID: {eq: priceId}, code: {eq: code}}))
      setAsyncState('get')
    }
  }

  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'get') {
        console.log(data)
        if (data.length !== 0) {
          setCoupon(data[0])
          run(remove(data[0].id))
          setAsyncState('remove')
        }
      }
      else if (asyncState === 'remove') {
        result({
          isFree: coupon.isFree,
          discount: coupon.percentage,
        })
      }
    }
    else if (status === 'rejected') {
      console.log(error)
      NotificationManager.error('Coupon error', 'Worning', 3000);
    }
  }, [status])
  return (
    <div>
      <div className="form-element pt-24">
        <div className="form-label">Coupon Code</div>
        <input
          type="text"
          className="form-input"
          placeholder="Coupon Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="flex justify-center pt-16">
        <button className={classes.button} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
export default Coupon
