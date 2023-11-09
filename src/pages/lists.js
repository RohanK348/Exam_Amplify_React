import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import List1 from '../components/lists/list-1'
import List2 from '../components/lists/list-2'
import List3 from '../components/lists/list-3'
import List4 from '../components/lists/list-4'
import List5 from '../components/lists/list-5'
import lists from '../json/lists.json'

const Index = () => {
  return (
    <>
      <SectionTitle title="UI Elements" subtitle="Lists" />

      <Widget
        title="Single line lists"
        description={
          <span>
            Use the following examples as starting points for your single list
            components
          </span>
        }>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <List1 items={lists} />
          </div>
          <div className="w-full lg:w-1/2">
            <List2 items={lists} />
          </div>
        </div>
      </Widget>

      <Widget
        title="Double line lists"
        description={
          <span>
            Use the following examples as starting points for your double list
            components
          </span>
        }>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <List3 items={lists} />
          </div>
          <div className="w-full lg:w-1/2">
            <List4 items={lists} />
          </div>
        </div>
      </Widget>

      <Widget
        title="Multi line lists"
        description={
          <span>
            Use the following examples as starting points for your multi line
            list components
          </span>
        }>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <List5 items={lists} />
          </div>
        </div>
      </Widget>
    </>
  )
}
export default Index
