import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/social-feed/widget'
import Kanban from '../components/kanban'

const Index = () => (
  <>
    <SectionTitle title="Apps" subtitle="Kanban" />
    <Widget>
      <Kanban />
    </Widget>
  </>
)
export default Index
