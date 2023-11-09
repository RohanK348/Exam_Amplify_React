import React from 'react'
import {lighten, darken} from '../../../functions/colors'
import Datamap from 'react-datamaps'

const BubblesExample = ({colors, backgroundColor}) => (
  <Datamap
    responsive
    geographyConfig={{
      borderWidth: 1,
      borderOpacity: 1,
      borderColor: darken(backgroundColor, 5),
      highlightFillColor: darken(backgroundColor, 5),
      highlightBorderColor: darken(backgroundColor, 5),
      popupOnHover: false,
      highlightOnHover: false
    }}
    fills={{
      defaultFill: lighten(backgroundColor, 3),
      USA: colors[2],
      BRA: colors[0],
      RUS: colors[1]
    }}
    bubbles={[
      {
        name: 'Not a bomb, but centered on Brazil',
        radius: 25,
        centered: 'BRA',
        country: 'BRA',
        yield: 0,
        fillKey: 'BRA',
        date: '1954-03-01'
      },
      {
        name: 'Castle Bravo',
        radius: 25,
        yield: 15000,
        country: 'USA',
        significance:
          'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
        fillKey: 'USA',
        date: '1954-03-01',
        latitude: 11.415,
        longitude: 165.1619
      },
      {
        name: 'Tsar Bomba',
        radius: 25,
        yield: 50000,
        country: 'USSR',
        fillKey: 'RUS',
        significance:
          'Largest thermonuclear weapon ever tested-scaled down from its initial 100Mt design by 50%',
        date: '1961-10-31',
        latitude: 73.482,
        longitude: 54.5854
      }
    ]}
    bubbleOptions={{
      popupTemplate: (geo, data) =>
        `<div class="bg-white p-2 shadow-lg rounded-lg text-sm">${data.country}: ${data.name}`,
    }}
  />
)

export default BubblesExample
