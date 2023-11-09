import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import {Line} from 'react-chartjs-2'
import {getColor, toRGB, isDarkPalette} from '../../functions/colors'
import {random} from '../../functions/numbers'

const Chart = ({
  height = 200,
  fill = true,
  color1 = 'bg-red-500',
  color2 = 'bg-blue-500'
}) => {
  const {palettes, collapsed, layout} = useSelector(
    state => ({
      palettes: state.palettes,
      collapsed: state.collapsed,
      layout: state.layout
    }),
    shallowEqual
  )
  const {background} = {...palettes}
  const isDark = isDarkPalette(background)
  const key = `${layout}-${collapsed}-${background}`

  const randomData1 = Array.from(Array(24).keys()).map(i => random(50, 100))
  const labels = [
    ...[
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ].map(i => `${i} 2019`),
    ...[
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ].map(i => `${i} 2020`)
  ]

  const legend = {
    display: true,
    labels: {
      fontColor: isDark ? getColor('text-grey-100') : getColor('text-grey-900'),
      boxWidth: 10,
      fontSize: 11
    }
  }

  const options = {
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    animation: {
      duration: 0
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    },
    scales: {
      xAxes: [
        {
          //display: false,
          ticks: {
            fontColor: isDark
              ? getColor('text-grey-100')
              : getColor('text-grey-900'),
            min: 0,
            maxTicksLimit: 10
          },
          gridLines: {
            drawBorder: false,
            display: false,
            color: 'rgba(0, 0, 0, 0)'
          }
        }
      ],
      yAxes: [
        {
          //display: false,
          ticks: {
            fontColor: isDark
              ? getColor('text-grey-100')
              : getColor('text-grey-900'),
            min: 40
          },
          gridLines: {
            drawBorder: false,
            display: false,
            color: 'rgba(0, 0, 0, 0)'
          }
        }
      ]
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sales',
        fill: fill,
        backgroundColor: fill ? toRGB(getColor(color1), 0.5) : getColor(color1),
        borderColor: getColor(color1),
        data: randomData1
      }
      /*
      {
        label: 'Conversions',
        fill: fill,
        backgroundColor: fill ? toRGB(getColor(color2), .5) : getColor(color2),
        borderColor: getColor(color2),
        data: randomData2
      },
      */
    ]
  }

  return (
    <div style={{height: height}}>
      <Line
        key={key}
        data={data}
        height={height}
        options={options}
        legend={legend}
      />
    </div>
  )
}

export default Chart
