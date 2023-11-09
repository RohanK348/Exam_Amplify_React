import React from 'react'

const Item = ({number, title}) => (
  <div className="flex flex-col text-blue-500 p-2 lg:p-6 w-1/2 lg:w-1/5">
    <div className="text-3xl font-bold">{number}</div>
    <div className="font-sm">{title}</div>
  </div>
)

const Options = () => (
  <div className="flex flex-row flex-wrap items-center justify-center uppercase mb-4 text-center">
    <Item number="2" title="Backgrounds" />
    <Item number="2" title="Layouts" />
    <Item number="+100" title="Components" />
    <Item number="5" title="Sample apps" />
  </div>
)

export default Options
