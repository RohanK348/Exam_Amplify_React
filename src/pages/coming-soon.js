import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../layouts/centered'
import CenteredForm from '../layouts/centered-form'
import ComingSoon from '../components/coming-soon'

const Index = () => {
  return (
    <Layout>
      <CenteredForm
        title="We are working on something awesome"
        subtitle="Please return to our website in">
        <ComingSoon />
        <div className="flex flex-row w-full text-center">
          <Link
            to="/"
            className="btn btn-default btn-block bg-blue-500 hover:bg-blue-600 text-white btn-rounded">
            Go back
          </Link>
        </div>
      </CenteredForm>
    </Layout>
  )
}

export default Index
