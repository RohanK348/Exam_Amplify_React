import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'

const Index = () => (
  <>
    <SectionTitle title="Pages" subtitle="Empty page" />
    <Widget title="Page title" description={<span>Page description</span>}>
      <p>This is an empty page</p>
    </Widget>
  </>
)
export default Index
