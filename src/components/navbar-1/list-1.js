import React from 'react'

const List1 = () => {
  const items = [
    {
      title: 'Teams',
      subtitle: 'Minima quasi sunt.',
      number: '01',
      color: 'bg-blue-500 text-white'
    },
    {
      title: 'Blog',
      subtitle: 'Possimus non dolor.',
      number: '02',
      color: 'bg-blue-500 text-white'
    },
    {
      title: 'Meetups',
      subtitle: 'Cupiditate aliquid magnam.',
      number: '03',
      color: 'bg-blue-500 text-white'
    },
    {
      title: 'Advertise with us',
      subtitle: 'Doloribus modi cum.',
      number: '04',
      color: 'bg-blue-500 text-white'
    },
    {
      title: 'Features',
      subtitle: 'Voluptatum suscipit minima.',
      number: '05',
      color: 'bg-blue-500 text-white'
    },
    {
      title: 'Job board',
      subtitle: 'Magnam quae quia.',
      number: '06',
      color: 'bg-blue-500 text-white'
    },
  ]
  return (
    <div className="flex flex-row flex-wrap">
      {items.map((item, i) => (
        <div key={i} className="w-1/2 p-2 dropdown-item">
          <div className="flex flex-row items-center justify-start">
            <div className="flex-shrink-0 w-8">
              <span
                className={`h-8 w-8 ${item.color} flex items-center justify-center rounded-full text-lg font-display font-bold`}>
                {item.number}
              </span>
            </div>
            <div className="ml-2">
              <div className="text-sm font-bold">{item.title}</div>
              <div className="text-xs">{item.subtitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default List1
