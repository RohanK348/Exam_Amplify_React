import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {NotificationManager} from 'react-notifications'
// import {FiAlertCircle} from 'react-icons/fi'

import {useStyles} from '../style/common'
import Text from '../../components/login-2/text'
import Logo from '../../components/login-2/logo'
import Footer from '../../components/login-2/footer'
// import SocialMedia from '../../components/login-1/social-media'
import {setCookie} from '../../functions/cookie'
import {useSetting} from '../../provider/setting'
import {useAsync} from '../../functions/utils'
import {signin} from '../../api/auth'
import {getFilter} from '../../api/user'

const Login = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const history = useHistory()
  const [, dispatch] = useSetting()
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [asyncState, setAsyncState] = useState('')

  const validate = () => {
    let res = true
    if (email === '')
      res = false
    else if (password === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSubmit = () => {
    if (!validate())
      return
    run(signin({email, password}))
    setAsyncState('signin')
  }

  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'signin') {
        run(getFilter({email: {eq: email}}))
        setAsyncState('getUser')
      }
      else if (asyncState === 'getUser') {
        if (data.length !== 0) {
          const user = data[0]
          dispatch({type: 'SET', settingName: 'auth', settingData: user})
          setCookie('auth', JSON.stringify(user), 1)
          if (user?.role === 'student')
            history.push('/course')
          else if (user?.role === 'admin')
            history.push('/admin/topic')
          else if (user?.role === 'corporate')
            history.push('/corporate')
          else if (user?.role === 'candidate')
            history.push('/dashboard')
        }
        setAsyncState('')
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
            Login to Empowerr
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
                <div className="form-label">Password</div>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className={classes.button} style={{marginBottom: 30}} onClick={handleSubmit}>Login</button>
            </div>
          </div>
          {/* <SocialMedia /> */}
          <div className="flex flex-row w-full">
            <span className="text-secondary mr-1">New user?</span>
            <span>
              <Link className="link" to="/register">
                Create account here
              </Link>
            </span>
          </div>
          <div className="flex flex-row w-full">
            <span className="text-secondary mr-1">goto </span>
            <span>
              <Link className="link" to="/confirm">
                Confirm
              </Link>
            </span>
          </div>
          <div className="w-full">
            <span>
              <Link className="link" to="/forget">
                Forgot password?
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
