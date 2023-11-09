import React from 'react'
import items from '../../json/timelines.json'

export const Timeline1 = () => {
  return (
    <div className="flex flex-col w-full">
      {items.map((item, i) => (
        <div className="flex relative justify-start items-start" key={i}>
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-grey-200 dark:bg-grey-800 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-blue-500 text-white relative z-10 font-medium text-sm">
            {item.index}
          </div>
          <div className="flex-grow flex items-start flex-col pb-4">
            <div className="flex items-start justify-start px-4">
              <div className="flex flex-col w-full">
                <div className="text-sm font-bold">{item.title}</div>
                <div className="text-sm">{item.sentence}</div>
                <div className="text-sm">{item.timeago}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/*
export const Timeline2 = () => {
  const items = Array.from(Array(4).keys()).map(i => {
    faker.locale = 'en_US'
    return {
      index: i + 1,
      title: faker.lorem.sentence(5),
      sentence: faker.lorem.sentence(5),
      description: faker.lorem.sentence(10),
      number: faker.random.number(9) + 1,
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
    <div className="flex flex-wrap">
      {items.map((item, i) => (
        <div className="flex relative justify-start items-start" key={i}>
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-grey-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center bg-blue-500 text-white relative z-10 font-medium text-sm">
            {item.index}
          </div>
          <div className="flex-grow pl-6 flex items-start flex-col">
            <div className="flex items-center justify-start p-2 space-x-4">
              <div className="flex-shrink-0 w-8">
                <img
                  src={item.img}
                  alt="media"
                  className={`h-8 w-full shadow-lg rounded-full shadow-outline`}
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="text-sm font-bold">{item.title}</div>
                <div className="text-sm">{item.sentence}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
*/
