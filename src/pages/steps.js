import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import Steps from '../components/steps'
import {Steps1, Steps2, Steps3} from '../components/steps/samples'

const Index = () => {
  return (
    <>
      <SectionTitle title="Forms" subtitle="Steps" />
      <Widget
        title="Form steps"
        description={<span>Sample form step components</span>}>
        <Steps1 />
        <Steps2 />
        <Steps3 />
      </Widget>
      <Widget
        title="Example"
        description={<span>Ready to use form steps example</span>}>
        <Steps />
      </Widget>
    </>
  )
}

export default Index
