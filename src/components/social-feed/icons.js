import React from 'react'
import {
  FiThumbsUp,
  FiMessageCircle,
  FiShare2
} from 'react-icons/fi'
import Avatars from './avatars'

const Icons = ({items}) => (
  <div className="flex flex-row items-center justify-start mb-4">
    <button className="btn btn-default btn-rounded btn-icon">
      <FiThumbsUp size={18} className="stroke-current" />
      <span className="ml-2">Like</span>
    </button>
    <button className="btn btn-default btn-rounded btn-icon">
      <FiShare2 size={18} className="stroke-current" />
      <span className="ml-2">Share</span>
    </button>
    <button className="btn btn-default btn-rounded btn-icon">
      <FiMessageCircle size={18} className="stroke-current" />
      <span className="ml-2">Comment</span>
    </button>

    <Avatars items={items} />
  </div>
)

export default Icons
