import React from 'react'
import {ProgressBar} from '../progress-bars'
import faker from 'faker/locale/en_US'
import moment from 'moment'
import {random} from '../../functions/numbers'

export const List = () => {
  const items = Array.from(Array(4).keys()).map(i => {
    faker.locale = 'en_US'
    return {
      title: faker.lorem.sentence(5),
      sentence: faker.lorem.sentence(5),
      description: faker.lorem.sentence(10),
      number: faker.random.number(9) + 1,
      progress: random(30, 70),
      color: faker.random.arrayElement([
        'bg-blue-500',
        'bg-red-500',
        'bg-teal-500',
        'bg-indigo-500',
        'bg-amber-500'
      ]),
      img: `/assets/faces/${faker.random.arrayElement([
        'm',
        'w'
      ])}${faker.random.number(9) + 1}.png`,
      timeago: moment()
        .subtract(i, 'days')
        .fromNow()
    }
  })
  return (
    <div className="list mb-4">
      {items.map((item, i) => (
        <div
          className="flex items-center justify-start p-2 space-x-4"
          key={i}>
          <div className="flex-shrink-0 w-8">
            <img
              src={item.img}
              alt="media"
              className="h-8 w-full shadow-lg rounded-full shadow-outline"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="text-sm font-bold">{item.title}</div>
            <div className="text-sm">{item.sentence}</div>
            <div className="flex flex-row items-center justify-around">
              <ProgressBar width={item.progress} color={item.color} />
              <span className="text-grey-500">{item.progress}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
