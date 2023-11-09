import React from 'react'
import SectionTitle from '../section-title'
import {Badge} from '../../components/badges'

const items = [
  {
    date: 'Sep 22, 2020',
    tag: (
      <Badge size="sm" color="bg-red-500 text-white" rounded>
        Update
      </Badge>
    ),
    items: [
      <div>
        Refactored modals
      </div>,
      <div>
        Updated TailwindCSS
      </div>,
      <div>
        Added notifications component
      </div>,
    ]
  },
  {
    date: 'Aug 2, 2020',
    tag: (
      <Badge size="sm" color="bg-red-500 text-white" rounded>
        Update
      </Badge>
    ),
    items: [
      <span>Updated Tailwind.css to version 1.6</span>,
      <span>Added e-commerce view</span>,
      <span>Added invoice view</span>,
      <span>Refactored form components</span>,
      <span>Refactored modals</span>,
    ]
  },
  {
    date: 'Jul 16, 2020',
    tag: (
      <Badge size="sm" color="bg-red-500 text-white" rounded>
        Update
      </Badge>
    ),
    items: [
      <span>Updated Tailwind.css</span>,
      <span>Added pricing tables</span>,
      <span>Added login page</span>,
      <span>Added sidebar animation</span>,
      <span>Added dark background classes</span>,
      <span>Added typography plugin</span>
    ]
  },
  {
    date: 'Jul 1, 2020',
    tag: (
      <Badge size="sm" color="bg-green-500 text-white" rounded>
        Release
      </Badge>
    ),
    items: [
      <span>Initial release</span>,
      <>
        Published template at{' '}
        <a
          href="https://d-board.mobifica.com"
          target="_blank"
          rel="noopener noreferrer">
          this demo url
        </a>
      </>
    ]
  }
]
export const ChangeLog = () => (
  <>
    <SectionTitle title="Change log" subtitle="Latest updates" />
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div className="w-full mb-2" key={i}>
          <div className="text-base font-sans font-bold mb-2">
            {item.date}
          </div>
          <p className="mb-2">{item.tag}</p>
          <ol className="list-disc pl-6">
            {item.items.map((list, j) => (
              <li className="mb-2" key={j}>{list}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  </>
)
