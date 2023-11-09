import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {NotificationManager} from 'react-notifications'
// import {FiAlertCircle} from 'react-icons/fi'

import {useStyles} from '../style/common'
import Text from '../../components/login-2/text'
import Logo from '../../components/login-2/logo'
import Footer from '../../components/login-2/footer'
// import SocialMedia from '../../components/login-1/social-media'
import {useAsync} from '../../functions/utils'
import {isEmail} from '../../functions/string'
import {signup} from '../../api/auth'
import {create} from '../../api/user'
import {create as createProfile} from '../../api/profile'
import {create as createCorporate} from '../../api/corporate'
import {isPhoneNumber} from '../../functions/string'

const Register = () => {
  const classes = useStyles();
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const history = useHistory()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('corporate')
  const [isAccept, setIsAccept] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const validate = () => {
    let res = true
    if (role === 'candidate' && !isAccept)
      NotificationManager.warning('Please accept the email and SMS communication option', 'Worning', 3000);
    if (firstName === '')
      res = false
    if (lastName === '')
      res = false
    if (role === 'corporate' && companyName === '')
      res = false
    if (role === 'candidate' && (phone === ''||!isPhoneNumber(phone)))
      res = false
    if (email === '' || !isEmail(email))
      res = false
    if (password === '')
      res = false
    if (confirmPassword === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    if (password !== confirmPassword) {
      NotificationManager.warning('Confirm password is not equal', 'Worning', 3000);
      res = false
    }
    return res
  }
  const handleSubmit = () => {
    if (!validate())
      return
    run(signup({firstName, email, password}))
    setAsyncState('signup')
  }

  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'signup') {
        if (role === 'candidate') {
          run(createProfile({}))
        }
        else if (role === 'corporate') {
          run(createCorporate({companyName: companyName}))
        }
        setAsyncState('createProfile')
      }
      else if (asyncState === 'createProfile') {
        console.log(data)
        let tmp = {}
        tmp.firstName = firstName
        tmp.lastName = lastName
        tmp.companyName = companyName
        tmp.phone = phone
        tmp.email = email
        tmp.avatar = '/images/default-avatar.jpg'
        tmp.role = role
        if (role === 'candidate')
          tmp.profileID = data.id
        else if (role === 'corporate')
          tmp.corporateID = data.id
        run(create(tmp))
        setAsyncState('create')
      }
      else if (asyncState === 'create') {
        history.push('/confirm')
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
        <div className="hidden lg:flex lg:flex-col w-1/2 text-white p-8 items-start justify-between relative bg-login-2">
          <Logo />
          <Text />
          <Footer />
        </div>
        <div className="w-full lg:w-1/2 bg-white p-8 lg:p-24 flex flex-col items-start justify-center">
          <p className="text-2xl font-bold text-black-500 mb-4">
            Signup to Empowerr
          </p>
          <div className="flex flex-col lg:w-full pr-4">
            <div className="form-element">
              <div className="flex items-center justify-start space-x-2 pt-5">
                <label className="flex items-center justify-start space-x-2 pr-5">
                  <input
                    type="radio"
                    value="corporate"
                    checked={role==='corporate'}
                    onChange={(e) => setRole(e.target.value)}
                    className={`form-radio h-4 w-4`}
                  />
                  <span>
                    I'm hiring
                  </span>
                </label>
                <label className="flex items-center justify-start space-x-2 pr-5">
                  <input
                    type="radio"
                    value="candidate"
                    checked={role==='candidate'}
                    onChange={(e) => setRole(e.target.value)}
                    className={`form-radio h-4 w-4`}
                  />
                  <span>
                    I need a job
                  </span>
                </label>
              </div>
            </div>
          </div>
          {role==='candidate'&&
          <div className="flex items-center justify-start space-x-2 pb-4">
            <div className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                value={isAccept}
                onChange={(e) => setIsAccept(e.target.checked)}
                name="sms"
                className="form-checkbox text-blue-500 h-4 w-4"
              />
              <span>I accept to receive email and SMS communication from Empowerr</span>
            </div>
          </div>
          }
          <div className="flex flex-row w-full">
            <div className="flex flex-col lg:w-1/2 sm:w-full pr-4">
              <div className="w-full">
                {role==='corporate'&&
                  <div className="form-element">
                    <div className="form-label">Company Name</div>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                }
                {role==='candidate'&&
                  <div className="form-element">
                    <div className="form-label">Phone</div>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                }
                <div className="form-element">
                  <div className="form-label">First Name</div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
              </div>
            </div>
            <div className="flex flex-col lg:w-1/2 sm:w-full">
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
                  <div className="form-label">Last Name</div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-element">
                  <div className="form-label">Confirm Password</div>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <button className={classes.button} style={{marginBottom: 30}} onClick={handleSubmit}>Signup</button>
          {/* <SocialMedia /> */}
          <div className="flex flex-row w-full">
            <span className="text-secondary mr-1">goto </span>
            <span>
              <Link className="link" to="/login">
                Login
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
        </div>
      </div>
    </>
  )
}

export default Register
