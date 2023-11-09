import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {NotificationManager} from 'react-notifications'

import {useStyles} from '../style/common'
import Text from '../../components/login-2/text'
import Logo from '../../components/login-2/logo'
import Footer from '../../components/login-2/footer'
import {useAsync} from '../../functions/utils'
import {forgetPassword, confirmNewPassword} from '../../api/auth'

const ForgetPassword = () => {
  const {status, error, run} = useAsync({
    status: 'idle',
  })
  const history = useHistory()
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState('')
  const [asyncState, setAsyncState] = useState('')

  const validate = () => {
    let res = true
    if (email === '')
      res = false
    if (state === 'confirm') {
      if (code === '')
        res = false
      if (password === '')
        res = false
    }
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleForget = () => {
    if (!validate())
      return
    run(forgetPassword(email))
    setAsyncState('forget')
  }
  const handleConfirm = () => {
    if (!validate())
      return
    run(confirmNewPassword(email, code, password))
    setAsyncState('confirm')
  }

  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'confirm')
        history.push('/login')
      else if (asyncState === 'forget') {
        NotificationManager.success('Please check your mail', 'Success', 3000);
        setState('confirm')
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
            Forget Password
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
              {state === 'confirm' &&
              <>
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
                <div className="form-element">
                  <div className="form-label">Password</div>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
              }
              {state === 'confirm'?
              <button className={classes.button} style={{marginBottom: 30}} onClick={handleConfirm}>Confirm</button>:
              <button className={classes.button} style={{marginBottom: 30}} onClick={handleForget}>Forget Password</button>
              }
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

export default ForgetPassword
