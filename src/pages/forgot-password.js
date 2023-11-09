import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../layouts/centered'
import CenteredForm from '../layouts/centered-form'
import ForgotPassword from '../components/sample-forms/forgot-password'

const Index = () => {
  return (
    <Layout>
      <CenteredForm
        title="Forgot password"
        subtitle="Please enter your email address to recover your password">
        <ForgotPassword message="Thanks for your message. We'll get back to you as soon as possible" />
        <div className="w-full mt-2">
          <span>
            <Link to="/login" className="link">
              Go back to login
            </Link>
          </span>
        </div>
      </CenteredForm>
    </Layout>
  )
}

export default Index
