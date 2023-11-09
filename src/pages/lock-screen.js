import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../layouts/centered'
import CenteredForm from '../layouts/centered-form'
import LockScreen from '../components/sample-forms/login'

const Index = () => {
  return (
    <Layout>
      <CenteredForm
        title="Lock screen"
        subtitle="Please enter your username and password to login">
        <div className="flex flex-col w-full items-center justify-center mb-4">
          <img
            src="/assets/faces/m1.png"
            alt="media"
            className="rounded-full h-20 w-20 shadow-outline my-2"
          />
        </div>

        <LockScreen />

        <div className="flex flex-row w-full mt-4">
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
      </CenteredForm>
    </Layout>
  )
}

export default Index
