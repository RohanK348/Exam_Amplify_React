import React from 'react'
import SectionTitle from '../components/section-title'
import Radar from '../components/charts/radar'
import Polar from '../components/charts/polar'
import Scatter from '../components/charts/scatter'
import Widget from '../components/widget'

const Index = () => (
  <>
    <SectionTitle title="Charts" subtitle="Other charts" />
    <Widget
      title="Scatter charts"
      description={
        <span>
          Use the <code>&lt;Scatter /&gt;</code> component for scatter charts
        </span>
      }>
      <Scatter />
    </Widget>
    <Widget
      title="Radar charts"
      description={
        <span>
          Use the <code>&lt;Radar /&gt;</code> component for radar charts
        </span>
      }>
      <Radar height={300} />
    </Widget>
    <Widget
      title="Polar charts"
      description={
        <span>
          Use the <code>&lt;Polar /&gt;</code> component for polar charts
        </span>
      }>
      <Polar />
    </Widget>
  </>
)
export default Index
