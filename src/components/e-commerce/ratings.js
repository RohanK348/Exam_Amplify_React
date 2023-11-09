import React, {useReducer} from 'react'
import StarRating from '../star-rating'

const Checkboxes = () => {
  const items = [
    {
      value: 1,
      checked: false
    },
    {
      value: 2,
      checked: false
    },
    {
      value: 3,
      checked: false
    },
    {
      value: 4,
      checked: false
    },
    {
      value: 5,
      checked: false
    }
  ]

  const reducer = (state, action) => {
    switch (action.type) {
      case 'toggle':
        return state.map((item) => {
          if (item.value === action.value) item['checked'] = !action.checked
          return item
        })
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, items.reverse())

  return (
    <div className="flex flex-col w-full">
      {state.map((item, i) => (
        <div className="flex flex-row items-center justify-start p-1" key={i}>
          <label className="flex items-center justify-start space-x-2">
            <input
              name={i}
              type="checkbox"
              checked={item.checked}
              onChange={(e) => dispatch({type: 'toggle', ...item})}
              className="form-checkbox text-blue-500 h-4 w-4"
            />
            <span>
              <StarRating initialRating={item.value} numberOfStars={5} />
            </span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default Checkboxes
