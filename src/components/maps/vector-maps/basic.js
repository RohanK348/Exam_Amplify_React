import React from 'react'
import Datamap from 'react-datamaps'

const Basic = ({defaultFill, altFill}) => {
  let fills = {
    defaultFill: defaultFill
  }
  let geographyConfig = {
    borderWidth: 1,
    borderOpacity: 1,
    borderColor: altFill,
    highlightOnHover: true,
    highlightFillColor: altFill,
    highlightBorderColor: altFill,
    highlightBorderWidth: 1,
    highlightBorderOpacity: 1
  }
  return <Datamap responsive fills={fills} geographyConfig={geographyConfig} />
}

export default Basic
