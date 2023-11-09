import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../layouts/centered'
import CenteredForm from '../layouts/centered-form'
import Login from '../components/sample-forms/login'
import SocialMedia from '../components/login-1/social-media'

const Index = () => {
  return (
    <Layout>
      <CenteredForm
        title="Login"
        subtitle="Please enter your username and password to login">
        <Login />
        <div className="w-full mt-3 mb-6">
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
      </CenteredForm>
    </Layout>
  )
}

export default Index
