import React from 'react'
import Layout from '../layouts/centered'
import CenteredForm from '../layouts/centered-form'
import Subscribe from '../components/sample-forms/subscribe'

const Index = () => {
  return (
    <Layout>
      <CenteredForm
        title="Subscribe"
        subtitle="Please enter your email address to subscribe to our newsletter to receive weekly updates">
        <Subscribe message="Thanks for your subscribing to our newsletter" />
      </CenteredForm>
    </Layout>
  )
}

export default Index
