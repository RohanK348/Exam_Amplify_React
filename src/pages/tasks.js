import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/social-feed/widget'
import Tasks from '../components/tasks'

const Index = () => (
  <>
    <SectionTitle title="Apps" subtitle="Tasks" />
    <div className="w-full">
      <div className="mb-2 uppercase font-bold text-xs tracking-wider flex flex-row items-center justify-start w-full uppercase">
        Today
      </div>
    </div>
    <Widget>
      <Tasks />
    </Widget>
    <div className="w-full pt-4">
      <div className="mb-2 uppercase font-bold text-xs tracking-wider flex flex-row items-center justify-start w-full uppercase">
        Upcoming
      </div>
    </div>
    <Widget>
      <Tasks />
    </Widget>
    <div className="w-full pt-4">
      <div className="mb-2 uppercase font-bold text-xs tracking-wider flex flex-row items-center justify-start w-full uppercase">
        Other
      </div>
    </div>
    <Widget>
      <Tasks />
    </Widget>
  </>
)
export default Index
