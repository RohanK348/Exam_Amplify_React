import React, {useState} from 'react'
import StarRating from '../star-rating'
import items from '../../json/products.json'
import {formatCurrency} from '../../functions/numbers'
import {FiGrid, FiMenu} from 'react-icons/fi'

const Products = () => {
  const [grid, setGrid] = useState(true)
  return (
    <>
      <div className="flex flex-row w-full items-center justify-between h-16 mb-4">
        <div className="font-normal">135 products</div>

        <div className="flex flex-row items-center justify-center space-x-1">
          <button
            className="btn btn-circle bg-transparent text-grey-500"
            onClick={() => setGrid(true)}>
            <FiGrid className="stroke-current" size={20} />
          </button>
          <button
            className="btn btn-circle bg-transparent text-grey-500"
            onClick={() => setGrid(false)}>
            <FiMenu className="stroke-current" size={20} />
          </button>
        </div>

        <div className="form-element form-element-inline">
          <div className="form-label">Sort by</div>
          <select className="form-select">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most popular</option>
            <option>Best sellers</option>
          </select>
        </div>
      </div>
      <div className={`${grid ? 'w-full flex flex-row flex-wrap' : 'hidden'}`}>
        {items.map((item, i) => (
          <div className="w-1/4 p-2" key={i}>
            <div className="w-full flex flex-col items-start justify-around space-y-2">
              <div className="mx-auto w-24">
                <img
                  src={item.img}
                  alt="media"
                  className={`h-24 w-full shadow-lg rounded-full shadow-lg`}
                />
              </div>
              <div className="text-sm font-bold">{item.title}</div>
              <div className="text-sm">{item.category}</div>
              <span>
                <StarRating initialRating={item.stars} numberOfStars={5} />
              </span>
              <div className="text-xl font-bold">
                {formatCurrency(item.price)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`${!grid ? 'w-full flex flex-col' : 'hidden'}`}>
        {items.map((item, i) => (
          <div
            className="flex items-center justify-start p-2 space-x-4 truncate"
            key={i}>
            <div className="flex-shrink-0 w-16">
              <img
                src={item.img}
                alt="media"
                className={`h-16 w-full shadow-lg rounded-full shadow-lg`}
              />
            </div>
            <div className="flex flex-col w-full min-w-0">
              <div className="text-sm font-bold">{item.title}</div>
              <div className="text-sm">{item.category}</div>
              <div className="text-sm truncate">{item.description}</div>
              <span>
                <StarRating initialRating={item.stars} numberOfStars={5} />
              </span>
            </div>
            <div className="flex-shrink-0">
              <div className="text-xl font-bold">
                {formatCurrency(item.price)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Products
