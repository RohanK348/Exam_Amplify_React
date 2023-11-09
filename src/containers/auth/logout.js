import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {useSetting} from '../../provider/setting'
import {useAsync} from '../../functions/utils'
import {signout} from '../../api/auth'
import {setCookie} from '../../functions/cookie'

const Logout = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [, dispatch] = useSetting()
  const history = useHistory()

  useEffect(() => {
    console.log('run signout')
    run(signout())
  }, [])
  useEffect(() => {
    if (status === 'resolved') {
      console.log('dispatch')
      dispatch({type: 'SET', settingName: 'auth', settingData: null})
      setCookie('auth', '', 0)
      history.push('/login')
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <div></div>
  )
}
export default Logout
