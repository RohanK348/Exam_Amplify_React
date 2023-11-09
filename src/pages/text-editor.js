import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import {
  TextEditorExample,
  CustomToolbarExample
} from '../components/text-editor'

const Index = () => (
  <>
    <SectionTitle title="Forms" subtitle="Text editor" />
    <Widget
      title="Custom toolbar"
      description={
        <span>
          Use the <code>&lt;CustomToolbarExample&gt;</code> example for a text
          editor with a custom toolbar
        </span>
      }>
      <CustomToolbarExample />
    </Widget>

    <Widget
      title="Full example"
      description={
        <span>
          Use the <code>&lt;TextEditorExample&gt;</code> example for an example
          that showcases all the available features
        </span>
      }>
      <TextEditorExample />
    </Widget>
  </>
)
export default Index
