import React from 'react'
import Question from './question'
import items from '../../json/faq.json'

const Faq = () => {
  return (
    <div className="w-full">
      {items.map((item, i) => (
        <Question key={i} {...item} />
      ))}
    </div>
  )
}
export default Faq
