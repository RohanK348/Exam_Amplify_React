import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import DragAndDrop from '../components/drag-and-drop'

const Index = () => (
  <>
    <SectionTitle title="Apps" subtitle="Kanban" />
    <Widget title="Page title" description={<span>Page description</span>}>
      <DragAndDrop />
    </Widget>
  </>
)
export default Index
