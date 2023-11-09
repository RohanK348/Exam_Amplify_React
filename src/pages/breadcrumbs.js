import React from 'react'
import SectionTitle from '../components/section-title'
import Breadcrumb from '../components/breadcrumbs'
import Widget from '../components/widget'

const Basic = () => {
  const items1 = [{title: 'Home', url: '/', last: true}]
  const items2 = [
    {title: 'Home', url: '/', last: false},
    {title: 'Second level', url: '/', last: true}
  ]
  const items3 = [
    {title: 'Home', url: '/', last: false},
    {title: 'Second level', url: '/', last: false},
    {title: 'Third level', url: '/', last: true}
  ]

  return (
    <>
      <div className="flex flex-row mb-4">
        <div className="w-full">
          <Breadcrumb items={items1} />
        </div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="w-full">
          <Breadcrumb items={items2} />
        </div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="w-full">
          <Breadcrumb items={items3} />
        </div>
      </div>
    </>
  )
}

const HomeIcons = () => {
  const items = [
    {title: 'Home', url: '/', last: false},
    {title: 'Second level', url: '/', last: false},
    {title: 'Third level', url: '/', last: true}
  ]

  return (
    <>
      <div className="flex flex-row mb-4">
        <div className="w-full">
          <Breadcrumb items={items} home={true} icon="arrow" />
        </div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="w-full">
          <Breadcrumb items={items} home={true} icon="chevron" />
        </div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="w-full">
          <Breadcrumb items={items} home={true} icon="chevrons" />
        </div>
      </div>
    </>
  )
}

const Index = () => {
  return (
    <>
      <SectionTitle title="UI Elements" subtitle="Breadcrumbs" />
      <Widget
        title="Default breadcrumbs"
        description={
          <span>
            Use the <code>&lt;Breadcrumbs /&gt;</code> component for breadcrumbs
          </span>
        }>
        <Basic />
      </Widget>
      <Widget
        title="Home icon"
        description={
          <span>
            Use the <code>home</code> prop for breadcrumbs. Change the icon
            using the <code>icon</code> prop.
          </span>
        }>
        <HomeIcons />
      </Widget>
    </>
  )
}
export default Index
