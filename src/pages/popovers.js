import React from 'react'
import SectionTitle from '../components/section-title'
import Popover from '../components/popovers'
import Widget from '../components/widget'

const placements = ['left', 'top', 'right', 'bottom']
const Index = () => (
  <>
    <SectionTitle title="Notifications" subtitle="Popovers" />
    <Widget
      title="Popovers"
      description={
        <span>
          Use the <code>&lt;Popover /&gt;</code> component to show simple
          popovers
        </span>
      }>
      <div className="flex flex-col items-start justify-start space-y-4">
        {placements.map((placement, i) => (
          <div key={i}>
            <Popover
              placement={placement}
              title="Popover title"
              content="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.">
              On {placement}
            </Popover>
          </div>
        ))}
      </div>
    </Widget>
  </>
)
export default Index
