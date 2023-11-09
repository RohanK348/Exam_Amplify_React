import React from 'react'
import {getColor} from '../../functions/colors'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import {random} from '../../functions/numbers'

const CustomTooltip = ({active, payload, label}) => {
  if (active) {
    let {name, profit, income} = {...payload[0].payload}
    return (
      <div className="bg-white text-grey-900 dark:bg-grey-800 dark:text-white shadow-lg rounded-lg p-2 text-xs">
        <div className="font-bold">{name}</div>
        <div>
          <span className="font-bold">Sales:</span>{' '}
          <span className="font-normal">{profit}</span>
        </div>
        <div>
          <span className="font-bold">Conversions:</span>{' '}
          <span className="font-normal">{income}</span>
        </div>
      </div>
    )
  }
  return null
}

export const RechartsArea1 = () => {
  let colors = [
    {dataKey: 'income', stroke: getColor('bg-green-500'), fill: getColor('bg-green-500')},
    {dataKey: 'profit', stroke: getColor('bg-blue-500'), fill: getColor('bg-blue-500')},
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
      profit: random(100, 200),
      income: random(150, 250)
    }
  })

  return (
    <div style={{width: '100%', height: 300}}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10
          }}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          {colors.map((color, i) => (
            <Area
              type="monotone"
              dataKey={color.dataKey}
              stroke={color.stroke}
              fill={color.fill}
              strokeWidth={2}
              activeDot={{r: 8}}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
