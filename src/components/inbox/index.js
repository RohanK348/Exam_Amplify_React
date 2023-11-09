import React from 'react'
import Datatable from './datatable'
import StarRating from '../star-rating'
import {FiPaperclip} from 'react-icons/fi'
import items from '../../json/inbox.json'

const Inbox = () => {
  const columns = [
    {
      Header: 'Checked',
      accessor: 'checked',
      Cell: (props) => (
        <span>
          <StarRating initialRating={0} numberOfStars={1} />
        </span>
      )
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Subject',
      accessor: 'subject'
    },
    {
      Header: 'Attachment',
      accessor: 'attachment',
      Cell: (props) =>
        props.value ? (
          <FiPaperclip size={14} className="stroke-current" />
        ) : null
    },
    {
      Header: 'Date',
      accessor: 'date'
    }
  ]
  return <Datatable columns={columns} data={items} />
}

export default Inbox
