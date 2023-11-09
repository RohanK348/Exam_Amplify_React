import React from 'react'
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {getColor} from '../../functions/colors'

const CustomTooltip = ({active, payload, label}) => {
  if (active) {
    return (
      <div className="bg-white text-grey-900 dark:bg-grey-800 dark:text-white shadow-lg rounded-lg p-2 text-xs">
        <div>
          <span className="font-bold">{payload[0].name}</span>{' '}
          <span className="font-normal">{payload[0].value}</span>
        </div>
      </div>
    )
  }
  return null
}

export const Donut1 = () => {
  const data = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200}
  ]
  let colors = [
    getColor('bg-blue-500'),
    getColor('bg-red-500'),
    getColor('bg-green-500'),
    getColor('bg-amber-500')
  ]

  return (
    <div style={{width: '100%', height: 400}}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            //cx={200}
            //cy={200}
            //startAngle={180}
            //endAngle={0}
            innerRadius={100}
            fill="#8884d8"
            dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            align="left"
            layout="vertical"
            verticalAlign="middle"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export const Donut2 = () => {
  const data = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200}
  ]
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div style={{width: '100%', height: 400}}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            //cx={420}
            //cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={100}
            //outerRadius={80}
            //fill="#8884d8"
            paddingAngle={1}
            dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export const Donut3 = () => {
  const data = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200}
  ]
  let colors = [
    getColor('bg-blue-500'),
    getColor('bg-red-500'),
    getColor('bg-green-500'),
    getColor('bg-amber-500')
  ]

  return (
    <div style={{width: '100%', height: 400}}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            //cx={200}
            //cy={200}
            //startAngle={180}
            //endAngle={0}
            innerRadius={0}
            fill="#8884d8"
            dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
