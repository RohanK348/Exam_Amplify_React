import React from 'react'
import {getColor} from '../../functions/colors'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import {random} from '../../functions/numbers'

const CustomTooltip = ({active, payload, label}) => {
  if (active) {
    let {name, sales, conversions} = {...payload[0].payload}
    return (
      <div className="bg-white text-grey-900 dark:bg-grey-800 dark:text-white shadow-lg rounded-lg p-2 text-xs">
        <div className="font-bold">{name}</div>
        <div>
          <span className="font-bold">Sales:</span>{' '}
          <span className="font-normal">{sales}</span>
        </div>
        <div>
          <span className="font-bold">Conversions:</span>{' '}
          <span className="font-normal">{conversions}</span>
        </div>
      </div>
    )
  }
  return null
}

export const Bar1 = () => {
  let colors = [
    {dataKey: 'sales', fill: getColor('bg-blue-200')},
    {dataKey: 'conversions', fill: getColor('bg-blue-600')}
  ]
  const labels = [
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
  ]
  const data = Array.from(Array(12).keys()).map(i => {
    return {
      name: labels[i],
      sales: random(100, 200),
      conversions: random(150, 250)
    }
  })

  return (
    <div style={{width: '100%', height: 240}}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10
          }}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}}/> 
          {colors.map((color, i) => (
            <Bar
              key={i}
              barSize={10}
              //stackId="sales"
              dataKey={color.dataKey}
              fill={color.fill}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

