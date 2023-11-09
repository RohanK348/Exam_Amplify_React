import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'

const Text = () => {
  const {config} = useSelector(
    (state) => ({
      config: state.config
    }),
    shallowEqual
  )
  let {name} = {...config}
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold mb-4">Welcome to {name}!</p>
      <p className="text-sm font-thin">
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend
        leo.
      </p>
    </div>
  )
}
export default Text
