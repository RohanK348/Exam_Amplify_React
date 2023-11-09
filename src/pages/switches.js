import React from 'react'
import SectionTitle from '../components/section-title'
import Switch from '../components/switch'
import Widget from '../components/widget'

const Index = () => {
  const items = [
    {title: 'API Access', subtitle: 'Enable access', checked: false},
    {title: 'Auth Access', subtitle: 'Enable access', checked: true}
  ]
  const colors = [
    'red',
    'pink',
    'purple',
    'deep-purple',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'light-green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deep-orange',
    'brown',
    'grey',
    'blue-grey'
  ]
  return (
    <>
      <SectionTitle title="Forms" subtitle="Switches" />

      <Widget
        title="Default switches"
        description={
          <span>
            Use the <code>&lt;Switch /&gt;</code> component for simple switches
          </span>
        }>
        <div className="flex flex-col lg:flex-row lg:flex-wrap w-full">
          {items.map((item, i) => (
            <div
              className="flex items-center justify-between w-full lg:w-1/4 lg:pr-4 mb-2 lg:mb-2"
              key={i}>
              <div className="flex flex-col">
                <div className="text-sm">{item.title}</div>
                <div className="text-xs text-grey-500 font-light">
                  {item.subtitle}
                </div>
              </div>
              <Switch initialState={item.checked} />
            </div>
          ))}
        </div>
      </Widget>

      <Widget
        title="Switch colors"
        description={
          <span>
            Use the <code>&lt;Switch /&gt;</code> component with the{' '}
            <code>color</code> prop to change the <code>Switch</code> color
          </span>
        }>
        <div className="flex flex-col lg:flex-row lg:flex-wrap w-full">
          {colors.map((color, i) => (
            <div
              className="flex items-center justify-between w-full lg:w-1/4 lg:pr-4 mb-2 lg:mb-2"
              key={i}>
              <div className="flex flex-col">
                <div className="text-sm">{color}</div>
                <div className="text-xs text-grey-500 font-light">
                  Sample label
                </div>
              </div>
              <Switch initialState={true} color={color} />
            </div>
          ))}
        </div>
      </Widget>
    </>
  )
}
export default Index
