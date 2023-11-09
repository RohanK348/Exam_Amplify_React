import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../layouts/centered'
import CenteredForm from '../layouts/centered-form'
import ResetPassword from '../components/sample-forms/reset-password'

const Index = () => {
  return (
    <Layout>
      <CenteredForm
        title="Reset password"
        subtitle="Please enter your new password to reset your account">
        <ResetPassword message="Thanks for your message. We'll get back to you as soon as possible" />

        <div className="flex flex-row w-full mt-2">
          <span className="mr-1">New user?</span>
          <span>
            <Link to="/create-account" className="link">
              Sign up here
            </Link>
          </span>
        </div>
        <div className="flex flex-row w-full">
          <span className="mr-1">Already have an account?</span>
          <span>
            <Link to="/login" className="link">
              Login here
            </Link>
          </span>
        </div>
      </CenteredForm>
    </Layout>
  )
}

export default Index
