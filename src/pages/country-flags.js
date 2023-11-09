import React from 'react'
import SectionTitle from '../components/section-title'
import flags from '../json/flags.json'
import Widget from '../components/widget'
import Flag from '../components/flag'

const Flags = () => (
  <>
    <SectionTitle title="Icons" subtitle="Country flags" />
    <Widget
      title="Flags"
      description={
        <span>
          Use the <code>&lt;Flag /&gt;</code> component for country flags. Use
          the <code>.text-size</code> utilities for different flag sizes.
        </span>
      }>
      <div className="flex flex-wrap mb-4">
        <div className="flex flex-row flex-wrap items-start justify-start space-x-2">
          {['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']
            .reverse()
            .map((size, i) => (
              <div className="flex flex-col items-center justify-center mb-4">
                <Flag size={size} code="us" />
              </div>
            ))}
        </div>
      </div>
    </Widget>
    <Widget
      title="All country flags"
      description={<span>All included flags</span>}>
      <div className="flex flex-wrap">
        <div className="flex flex-row flex-wrap items-start justify-start">
          {flags.map((flag, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center pr-4 mb-4 w-36 text-center">
              <Flag size="2xl" code={flag.code} />
            </div>
          ))}
        </div>
      </div>
    </Widget>
  </>
)
export default Flags
