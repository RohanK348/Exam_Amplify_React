import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import {Link} from 'react-router-dom'
import Login from '../components/sample-forms/login'
import Text from '../components/login-2/text'
import Logo from '../components/login-2/logo'
import Footer from '../components/login-2/footer'
import SocialMedia from '../components/login-1/social-media'
import Alert from '../components/alerts'
import {FiAlertCircle} from 'react-icons/fi'

const Index = () => {
  const {config} = useSelector(
    (state) => ({
      config: state.config
    }),
    shallowEqual
  )
  let {name} = {...config}
  return (
    <>
      <div className="w-full flex flex-row h-screen overflow-hidden">
        <div className="hidden lg:flex lg:flex-col w-1/2 text-white p-8 items-start justify-between relative bg-login-2">
          <Logo />
          <Text />
          <Footer />
        </div>
        <div className="w-full lg:w-1/2 bg-white p-8 lg:p-24 flex flex-col items-start justify-center">
          <p className="text-2xl font-bold text-blue-500 mb-4">
            Login to {name}
          </p>
          <div className="w-full mb-4">
            <Alert
              color="bg-blue-500 text-white"
              icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}>
              This is an important alert. Check it out!
            </Alert>
          </div>
          <Login />
          <SocialMedia />
          <div className="flex flex-row w-full">
            <span className="text-secondary mr-1">New user?</span>
            <span>
              <Link className="link" to="/create-account">
                Create account here
              </Link>
            </span>
          </div>
          <div className="w-full">
            <span>
              <Link className="link" to="/forgot-password">
                Forgot password?
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
