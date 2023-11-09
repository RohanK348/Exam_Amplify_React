import React from 'react'
import {
  FiCamera,
  FiPaperclip,
  FiMic,
} from 'react-icons/fi'

const Input = ({item}) => (
  <div className="form-element form-element-inline mb-8">
    <div className="flex-shrink-0 w-8">
      <img
        src={item.img}
        alt="media"
        className={`h-8 w-full shadow-lg rounded-full shadow-outline`}
      />
    </div>
    <input
      name="name"
      type="text"
      className="form-input border-0 bg-grey-100 ml-2"
      placeholder="Enter something..."
    />
    <div className="flex flex-row items-center justify-end space-x-1">
      <button className="btn btn-circle">
        <FiCamera size={18} className="stroke-current" />
      </button>
      <button className="btn btn-circle">
        <FiPaperclip size={18} className="stroke-current" />
      </button>
      <button className="btn btn-circle">
        <FiMic size={18} className="stroke-current" />
      </button>
    </div>
  </div>
)

export default Input
