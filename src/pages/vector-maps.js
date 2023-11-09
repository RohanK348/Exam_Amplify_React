import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import SectionTitle from '../components/section-title'
import {getColor, lighten, darken} from '../functions/colors'
import Widget from '../components/widget'
import Basic from '../components/maps/vector-maps/basic'
import StateLabels from '../components/maps/vector-maps/state-labels'
import Bubbles from '../components/maps/vector-maps/bubbles'

const Index = () => {
  const {palettes} = useSelector(
    (state) => ({
      palettes: state.palettes
    }),
    shallowEqual
  )
  const {background} = {...palettes}

  let backgroundColor =
    background === 'dark' ? getColor('bg-grey-700') : getColor('bg-grey-200')
  let defaultFill = lighten(backgroundColor, 3)
  let altFill = darken(backgroundColor, 3)
  let colors = [
    getColor('bg-amber-500'),
    getColor('bg-blue-500'),
    getColor('bg-red-500')
  ]
  return (
    <>
      <SectionTitle title="Maps" subtitle="Vector maps" />
      <Widget
        title="Basic map"
        description={
          <span>
            Use the <code>&lt;Basic /&gt;</code> component for a simple vector
            map of the world
          </span>
        }>
        <Basic key={background} defaultFill={defaultFill} altFill={altFill} />
      </Widget>

      <Widget
        title="USA map"
        description={
          <span>
            Use the <code>&lt;StateLabels /&gt;</code> component for a simple
            vector map of the USA
          </span>
        }>
        <StateLabels
          key={background}
          colors={colors}
          backgroundColor={backgroundColor}
        />
      </Widget>

      <Widget
        title="Map with bubbles"
        description={
          <span>
            Use the <code>&lt;Bubbles /&gt;</code> component for a vector map of
            the world with bubbles
          </span>
        }>
        <Bubbles
          key={background}
          colors={colors}
          backgroundColor={backgroundColor}
        />
      </Widget>
    </>
  )
}
export default Index
