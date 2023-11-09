import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'

const Index = () => {
  const colors = [
    'red',
    'pink',
    'purple',
    'deep-purple',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'light-green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deep-orange',
    'brown',
    'grey',
    'blue-grey'
  ]
  const items = [
    {title: 'Header 1', element: <h1>What we think, we become</h1>},
    {title: 'Header 2', element: <h2>What we think, we become</h2>},
    {title: 'Header 3', element: <h3>What we think, we become</h3>},
    {title: 'Header 4', element: <h4>What we think, we become</h4>},
    {title: 'Header 5', element: <h5>What we think, we become</h5>},
    {title: 'Header 6', element: <h6>What we think, we become</h6>},
    {
      title: 'Paragraph',
      element: (
        <p className="whitespace-normal">
          Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nullam id dolor id nibh ultricies vehicula
        </p>
      )
    },
    ...colors.map((color) => {
      return {
        title: `Text ${color}`,
        element: (
          <div className="flex flex-col">
            <div className={`text-${color}-400 font-light mb-2`}>
              Every moment is a fresh beginning
            </div>
            <div className={`text-${color}-500 font-normal mb-2`}>
              Never regret anything that made you smile
            </div>
            <div className={`text-${color}-600 font-bold mb-2`}>
              Whatever you do, do it well
            </div>
            <div className={`text-${color}-700 font-black`}>
              All limitations are self-imposed
            </div>
          </div>
        )
      }
    })
  ]

  return (
    <>
      <SectionTitle title="UI Elements" subtitle="Typography" />
      <Widget
        title="Default colors"
        description={
          <span>
            Control the font size of an element using the{' '}
            <code>.text-size</code> utilities included with{' '}
            <code>Tailwind CSS</code>. For more information go to{' '}
            <a
              className="link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://tailwindcss.com/docs/font-size/#app">
              this url
            </a>
            . For text color information go to{' '}
            <a
              className="link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://tailwindcss.com/docs/text-color/#app">
              this url
            </a>
            .
          </span>
        }>
        <div className="table table-auto w-full">
          <div className="table-row-group">
            {items.map((item, i) => (
              <div className="table-row" key={i}>
                <div className="table-cell whitespace-no-wrap px-2 text-sm">
                  {item.title}
                </div>
                <div className="table-cell px-2 whitespace-normal">
                  {item.element}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Widget>
    </>
  )
}
export default Index
