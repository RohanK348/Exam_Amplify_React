import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import BasicDropzone from '../components/dropzone/basic'
import Previews from '../components/dropzone/previews'

const Index = () => (
  <>
    <SectionTitle title="Forms" subtitle="File uploads" />
    <Widget
      title="Basic"
      description={
        <span>
          Use the <code>&lt;BasicDropzone /&gt;</code> component for simple
          dropzone file upload components.
        </span>
      }>
      <BasicDropzone />
    </Widget>
    <Widget
      title="Image previews"
      description={
        <span>
          Use the <code>&lt;Previews /&gt;</code> component for a file uploader
          that displays the uploaded images.
        </span>
      }>
      <Previews />
    </Widget>
  </>
)
export default Index
