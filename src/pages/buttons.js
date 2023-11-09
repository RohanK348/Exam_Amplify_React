import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import {FiStar} from 'react-icons/fi'

const Buttons = () => (
  <>
    <SectionTitle title="UI Elements" subtitle="Buttons" />

    <Widget title="Buttons" description={<span>Default button styles</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center justify-start space-y-2 lg:space-y-0 lg:space-x-2">
        <button className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white">
          Default
        </button>
        <button className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded">
          Rounded
        </button>
        <button className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
          <FiStar className="stroke-current mr-2" />
          <span>With icon</span>
        </button>
        <button className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
          <span className="mr-2">With icon</span>
          <FiStar className="stroke-current" />
        </button>
        <button className="btn btn-circle bg-blue-500 hover:bg-blue-600 text-white">
          <FiStar className="stroke-current" />
        </button>
      </div>
    </Widget>

    <Widget
      title="Outlined buttons"
      description={<span>Outlined button styles</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center justify-start space-y-2 lg:space-y-0 lg:space-x-2">
        <button className="btn btn-default btn-outlined bg-transparent text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700">
          Default
        </button>
        <button className="btn btn-default btn-outlined bg-transparent text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700 btn-rounded">
          Rounded
        </button>
        <button className="btn btn-default btn-outlined btn-rounded btn-icon bg-transparent text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700">
          <FiStar className="stroke-current mr-2" />
          <span>With icon</span>
        </button>
        <button className="btn btn-default btn-outlined btn-rounded btn-icon bg-transparent text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700">
          <span className="mr-2">With icon</span>
          <FiStar className="stroke-current" />
        </button>
        <button className="btn btn-circle bg-transparent text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700 btn-outlined">
          <FiStar className="stroke-current" />
        </button>
      </div>
    </Widget>

    <Widget title="Flat buttons" description={<span>Flat button styles</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center justify-start space-y-2 lg:space-y-0 lg:space-x-2">
        <button className="btn btn-default bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600">
          Default
        </button>
        <button className="btn btn-default btn-rounded btn-icon bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600">
          <FiStar className="stroke-current mr-2" />
          <span>With icon</span>
        </button>
        <button className="btn btn-default btn-rounded btn-icon bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600">
          <span className="mr-2">With icon</span>
          <FiStar className="stroke-current" />
        </button>
        <button className="btn btn-circle bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-flat">
          <FiStar className="stroke-current" />
        </button>
      </div>
    </Widget>

    <Widget
      title="Raised buttons"
      description={<span>Flat button styles</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center justify-start space-y-2 lg:space-y-0 lg:space-x-2">
        <button className="btn btn-default bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-raised">
          Default
        </button>
        <button className="btn btn-default bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-rounded btn-raised">
          Rounded
        </button>
        <button className="btn btn-default btn-rounded btn-icon bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-raised">
          <FiStar className="stroke-current mr-2" />
          <span>With icon</span>
        </button>
        <button className="btn btn-default btn-rounded btn-icon bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-raised">
          <span className="mr-2">With icon</span>
          <FiStar className="stroke-current" />
        </button>
        <button className="btn btn-circle bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-raised">
          <FiStar className="stroke-current" />
        </button>
      </div>
    </Widget>

    <Widget title="Buttons" description={<span>Button sizes</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center justify-start space-y-2 lg:space-y-0 lg:space-x-2 mb-2">
        <button className="btn btn-lg bg-blue-500 hover:bg-blue-600 text-white">
          Large
        </button>
        <button className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white">
          Default
        </button>
        <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white">
          Small
        </button>
      </div>
      <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center justify-start space-y-2 lg:space-y-0 lg:space-x-2">
        <button className="btn btn-circle btn-circle-lg bg-blue-500 hover:bg-blue-600 text-white">
          <FiStar className="stroke-current" />
        </button>
        <button className="btn btn-circle btn-circle-default bg-blue-500 hover:bg-blue-600 text-white">
          <FiStar className="stroke-current" />
        </button>
        <button className="btn btn-circle btn-circle-sm bg-blue-500 hover:bg-blue-600 text-white">
          <FiStar className="stroke-current" />
        </button>
      </div>
    </Widget>

    <Widget title="Button groups" description={<span>Button group sizes</span>}>
      <div className="w-full mb-2">
        <div className="flex flex-col lg:inline-flex lg:flex-row lg:flex-wrap items-start lg:items-center justify-start space-y-2 lg:space-y-0 lg:space-x-0">
          {['left', 'center', 'right'].map((item, i) => (
            <button
              className="btn btn-default bg-white border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700 first:border-r-0 last:border-l-0"
              key={i}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full mb-2">
        <div className="flex flex-col lg:inline-flex lg:flex-row lg:flex-wrap items-start lg:items-center justify-start space-y-2 lg:space-y-0 lg:space-x-0">
          {['left', 'center', 'right'].map((item, i) => (
            <button
              className="btn btn-default bg-white border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700 first:border-r-0 last:border-l-0 first:rounded-l-lg last:rounded-r-lg"
              key={i}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </Widget>
  </>
)
export default Buttons
