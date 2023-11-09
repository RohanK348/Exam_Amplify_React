import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import Select from 'react-select'
import {getColor, toRGB} from '../functions/colors'

/*
https://react-select.com/props
*/

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'}
]

const customStyles = {
  clearIndicator: (provided, state) => {
    return {...provided}
  },
  container: (provided, state) => {
    return {...provided}
  },
  control: (provided, state) => {
    return {...provided}
  },
  dropdownIndicator: (provided, state) => {
    return {...provided}
  },
  group: (provided, state) => {
    return {...provided}
  },
  groupHeading: (provided, state) => {
    return {...provided}
  },
  indicatorsContainer: (provided, state) => {
    return {...provided}
  },
  indicatorSeparator: (provided, state) => {
    return {...provided}
  },
  input: (provided, state) => {
    console.log(provided, state)
    return {...provided}
  },
  loadingIndicator: (provided, state) => {
    return {...provided}
  },
  loadingMessage: (provided, state) => {
    return {...provided}
  },
  menu: (provided, state) => {
    return {...provided}
  },
  menuList: (provided, state) => {
    return {...provided}
  },
  menuPortal: (provided, state) => {
    return {...provided}
  },
  multiValue: (provided, state) => {
    return {...provided}
  },
  multiValueLabel: (provided, state) => {
    return {...provided}
  },
  multiValueRemove: (provided, state) => {
    return {...provided}
  },
  noOptionsMessage: (provided, state) => {
    return {...provided}
  },
  option: (provided, state) => {
    console.log(provided)
    return {...provided}
  },
  placeholder: (provided, state) => {
    return {...provided}
  },
  singleValue: (provided, state) => {
    return {...provided}
  },
  /*
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return {...provided, opacity, transition}
  }
  */
  valueContainer: (provided, state) => {
    return {...provided}
  }
}

const Index = () => (
  <>
    <SectionTitle title="Forms" subtitle="React Select" />
    <Widget
      title="Simple select"
      description={
        <span>
          Use the <code>&lt;Select /&gt;</code> component for simple react
          selects
        </span>
      }>
      <div className="flex flex-wrap w-full">
        <div className="w-1/4 p-2">
          <Select styles={customStyles} options={options} />
        </div>
        <div className="w-1/4 p-2">
          <Select
            options={options}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: getColor('bg-blue-500'),
                primary25: toRGB(getColor('bg-blue-500'), 0.25),
                primary50: toRGB(getColor('bg-blue-500'), 0.5),
                primary75: toRGB(getColor('bg-blue-500'), 0.75),
                danger: getColor('bg-red-500'),
                dangerLight: toRGB(getColor('bg-red-500'), 0.25)
              }
            })}
          />
        </div>
      </div>
    </Widget>

    <Widget
      title="Multiple select"
      description={
        <span>
          Use the <code>&lt;Select /&gt;</code> component with the{' '}
          <code>isMulti</code> prop for react selects with multiple options
        </span>
      }>
      <div className="flex flex-wrap w-full">
        <div className="w-1/3 p-2">
          <Select
            options={options}
            isMulti={true}
            placeholder="Select multiple..."
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: getColor('bg-blue-500'),
                primary25: toRGB(getColor('bg-blue-500'), 0.25),
                primary50: toRGB(getColor('bg-blue-500'), 0.5),
                primary75: toRGB(getColor('bg-blue-500'), 0.75),
                danger: getColor('bg-red-500'),
                dangerLight: toRGB(getColor('bg-red-500'), 0.25)
              }
            })}
          />
        </div>
      </div>
    </Widget>
  </>
)
export default Index
