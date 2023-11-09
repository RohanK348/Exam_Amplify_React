import React from 'react'
import SectionTitle from '../components/section-title'
import {ProgressBar, ProgressBarWithText} from '../components/progress-bars'
import {random} from '../functions/numbers'
import Widget from '../components/widget'

const Index = () => {
  const palette = ['bg-red-500', 'bg-green-500', 'bg-blue-500']

  return (
    <>
      <SectionTitle title="UI Elements" subtitle="Progress bars" />
      <Widget
        title="Default progress bars"
        description={
          <span>
            Use the <code>&lt;ProgressBar /&gt;</code> component for simple
            progress bars
          </span>
        }>
        <div className="flex flex-col w-full">
          {palette.map((color, i) => (
            <div className="mb-4" key={i}>
              <ProgressBar width={random(30, 70)} color={color} />
            </div>
          ))}
        </div>
      </Widget>
      <Widget
        title="Progress bars with text"
        description={
          <span>
            Use the <code>&lt;ProgressBarWithText /&gt;</code> component for
            progress bars with text inside
          </span>
        }>
        <div className="flex flex-col w-full">
          {palette.map((color, i) => (
            <div className="mb-8" key={i}>
              <ProgressBarWithText width={random(30, 70)} color={color} />
            </div>
          ))}
        </div>
      </Widget>
    </>
  )
}
export default Index
