import React from 'react'
import Category from './category'

const Categories = () => {
  const items = [
    {
      name: 'Electronics',
      active: false,
      categories: [
        'Accessories',
        'Camera and Photo',
        'Cell phones',
        'GPS and Navigation',
      ]
    },
    {
      name: 'Computers',
      active: false,
      categories: [
        'Accesories',
        'Laptops',
        'Tablets',
        'Printers',
      ]
    },
    {
      name: 'Fashion',
      active: true,
      categories: [
        'Men\'s Fashion',
        'Women\'s Fashion',
        'Girl\'s Fashion',
        'Boy\'s Fashion',
      ]
    },
    {
      name: 'Home and Kitchen',
      active: true,
      categories: [
        'Bedding',
        'Kitchen and Dining',
        'Furniture',
        'Bath',
      ]
    },
  ]
  return (
    <div className="w-full">
      {items.map((item, i) => (
        <Category key={i} {...item} />
      ))}
    </div>
  )
}
export default Categories
