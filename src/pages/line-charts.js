import React from 'react'
import SectionTitle from '../components/section-title'
import Line from '../components/charts/line'
import Line1 from '../components/charts/line-1'
import Line2 from '../components/charts/line-2'
import {RechartsLine1} from '../components/recharts/line-1'
import {RechartsArea1} from '../components/recharts'
import Widget from '../components/widget'

const Index = () => (
  <>
    <SectionTitle title="Charts" subtitle="Line charts" />
    <div className="flex flex-col">
      <div className="w-full">
        <Widget
          title="Simple line charts"
          description={
            <span>
              Use the following examples as starting points for simple line
              charts
            </span>
          }>
          <div className="w-full mb-4">
            <RechartsLine1 />
          </div>
          <div className="w-full mb-4">
            <RechartsArea1 />
          </div>
          <div className="w-full mb-4">
            <Line height={150} fill={false} />
          </div>
          <div className="w-full mb-4">
            <Line1 color1="bg-teal-500" fill={false} />
          </div>
        </Widget>
      </div>
      <div className="w-full">
        <Widget
          title="Simple area chart"
          description={
            <span>
              Use the following examples as starting points for simple area
              charts
            </span>
          }>
          <div className="w-full mb-4">
            <Line1 color1="bg-teal-500" />
          </div>
          <div className="w-full mb-4">
            <Line2 />
          </div>
        </Widget>
      </div>
    </div>
  </>
)
export default Index
