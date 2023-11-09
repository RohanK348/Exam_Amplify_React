import React, { useState, useEffect } from 'react'

import {useAsync} from '../../functions/utils'
import {useSetting} from '../../provider/setting'
import {getByPaginationFilter as getNotifications} from '../../api/notification'

const List2 = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (setting.auth) {
      run(getNotifications({userID: {eq: setting?.auth?.id}}, 5, 0))
    }
  }, [run, setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      console.log(data)
      setItems(data)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <div className="flex flex-row flex-wrap">
      {items.map((item, i) => (
        <div key={i} className="w-full">
          <div
            className="flex items-center justify-start dropdown-item p-2"
            key={i}>
            <div className="ml-2">
              <div className="text-sm font-bold">{item.name}</div>
              <div className="text-xs">{item.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default List2
