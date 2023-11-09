import React from 'react'
import Colors from './colors'
import Toggle from './toggle'
import Sidebar from './sidebar'
import Demos from './demos'
import {useSelector, shallowEqual} from 'react-redux'
import '../../css/components/right-sidebar.css'

const RightSidebar = () => {
  const colors = [
    {bg: 'bg-white', text: 'text-white', name: 'light'},
    {bg: 'bg-grey-900', text: 'text-grey-900', name: 'dark'}
  ]
  const items = [
    {title: 'Background', key: 'background'},
    {title: 'Navbar', key: 'navbar'},
    {title: 'Left sidebar', key: 'leftSidebar'}
  ]
  const {config} = useSelector(
    state => ({
      config: state.config,
    }),
    shallowEqual
  )
  let {rightSidebar} = {...config}

  return (
    <div
      className={`right-sidebar right-sidebar-1 ${rightSidebar ? 'open' : ''}`}>
      <div>
        <div>
          <div className="flex flex-col">
            <div className="px-4 h-16 flex flex-row items-center justify-between bg-blue-500 text-white">
              <div className="uppercase text-sm font-bold tracking-wider">
                Settings
              </div>
              <Toggle />
            </div>
          </div>

          <Demos />
          <Sidebar />

          <div className="flex flex-col p-4">
            <div className="mb-2">
              <div className="uppercase text-sm font-bold tracking-wider mb-2">
                Colors
              </div>
            </div>

            {items.map((item, i) => (
              <Colors
                key={item.key}
                title={item.title}
                palettes={colors}
                name={item.key}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
