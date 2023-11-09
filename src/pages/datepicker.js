import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import Datepicker from '../components/datepicker'
import InlineDatepicker from '../components/datepicker/inline'

const Index = () => (
  <>
    <SectionTitle title="Forms" subtitle="Date pickers" />
    <Widget
      title="Inline date picker"
      description={
        <span>
          Use the <code>&lt;InlineDatepicker /&gt;</code> component to display a
          datepicker
        </span>
      }>
      <div className="flex flex-wrap w-full pb84">
        <div className="w-1/4 h-64">
          <InlineDatepicker />
        </div>
      </div>
    </Widget>
    <Widget
      title=" date picker"
      description={
        <span>
          Use the <code>&lt;Datepicker /&gt;</code> component for an input that
          displays a date picker
        </span>
      }>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-1/3">
          <Datepicker />
        </div>
      </div>
    </Widget>
  </>
)
export default Index
