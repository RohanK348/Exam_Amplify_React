import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import {Link} from 'react-router-dom'
import Login from '../components/sample-forms/login'
import SocialMedia from '../components/login-3/social-media'

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
        <div className="hidden lg:flex lg:flex-col w-1/2 items-center justify-center bg-grey-50 border-r border-grey-100">
          <img
            className="object-contain w-auto h-64 mb-8"
            src="/pages/error-page/illustration.svg"
            alt="svg"
          />
        </div>
        <div className="w-full lg:w-1/2 bg-white flex flex-col items-start justify-center p-4 lg:px-24">
          <div className="flex flex-col w-full mb-4">
            <div className="text-sm uppercase font-light text-grey-500">
              Login
            </div>
            <div className="text-sm font-bold">
              Please enter your username and password to login
            </div>
          </div>
          <Login />
          <div className="mt-4 mb-2">
            <SocialMedia />
          </div>
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
          <div className="flex flex-col w-full text-xs mt-4">
            <div className="flex flex-row space-x-2">
              <Link to="/privacy-policy">Privacy policy</Link>
              <Link to="/terms-of-service">Terms of service</Link>
              <Link to="/contact-us">Contact us</Link>
            </div>
            <div className="text-grey-500">&copy; {name} 2020</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
