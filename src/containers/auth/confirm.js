import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {NotificationManager} from 'react-notifications'

import {useStyles} from '../style/common'
import Text from '../../components/login-2/text'
import Logo from '../../components/login-2/logo'
import Footer from '../../components/login-2/footer'
// import SocialMedia from '../../components/login-1/social-media'
import {useAsync} from '../../functions/utils'
import {confirm, reSendConfirmCode} from '../../api/auth'

const Confirm = () => {
  const {status, error, run} = useAsync({
    status: 'idle',
  })
  const history = useHistory()
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [asyncState, setAsyncState] = useState('')

  const validate = () => {
    let res = true
    if (email === '')
      res = false
    if (code === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSubmit = () => {
    if (!validate())
      return
    run(confirm({email, code}))
    setAsyncState('confirm')
  }
  const handleResend = () => {
    if (email === '') {
      NotificationManager.warning('Please input email', 'Worning', 3000);
      return
    }
    run(reSendConfirmCode(email))
    setAsyncState('resend')
  }

  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'confirm')
        history.push('/login')
      else if (asyncState === 'resend') {
        NotificationManager.success('Please check your mail', 'Success', 3000);
      }
    }
    else if (status === 'rejected') {
      NotificationManager.warning(error?.message, 'Worning', 3000);
      console.log(error)
    }
  }, [status])
  return (
    <>
      <div className="w-full flex flex-row h-screen overflow-hidden">
        <div className="hidden lg:flex lg:flex-col w-2/3 text-white p-8 items-start justify-between relative bg-login-2">
          <Logo />
          <Text />
          <Footer />
        </div>
        <div className="w-full lg:w-1/3 bg-white p-8 lg:p-24 flex flex-col items-start justify-center">
          <p className="text-2xl font-bold text-black-500 mb-4">
            Confirm
          </p>
          <div className="flex flex-col w-full">
            <div className="w-full">
              <div className="form-element">
                <div className="form-label">Email</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-element">
                <div className="form-label">Code</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <button className={classes.button} style={{marginBottom: 30}} onClick={handleSubmit}>Confirm</button>
              <button className={classes.button} style={{marginBottom: 30, marginLeft: 20}} onClick={handleResend}>Resend Code</button>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <span className="text-secondary mr-1">New user?</span>
            <span>
              <Link className="link" to="/register">
                Create account here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Confirm
