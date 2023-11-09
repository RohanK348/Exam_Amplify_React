import React from 'react'
import {
  FiToggleLeft,
  FiList,
  FiActivity,
  FiCalendar,
  FiStar,
  FiDroplet,
  FiGrid,
  FiClock,
  FiCopy,
  FiUser,
  FiPieChart,
  FiMap,
  FiCompass,
  FiHelpCircle,
  FiShoppingCart,
  FiHome
} from 'react-icons/fi'
import {useSelector, shallowEqual} from 'react-redux'
import Item from './item'
import Logo from './logo'
import '../../css/components/left-sidebar-1.css'

const Sidebar = () => {
  const {navigation} = useSelector(
    (state) => ({
      navigation: state.navigation
    }),
    shallowEqual
  )
  return (
    <div className="left-sidebar left-sidebar-1">
      <Logo />
      <div>
        <div className="left-sidebar-title">
          <span>Question</span>
        </div>
        <ul>
          <li className="l0">
            <Item url="/admin/topic" icon={<FiList size={20} />} title="Topic" isRoot={false}/>
            <Item url="/admin/template" icon={<FiList size={20} />} title="Template" isRoot={false}/>
            <Item url="/admin/exam" icon={<FiList size={20} />} title="Exam" isRoot={false}/>
            {/* <ul>
              <li className="l1">
                <Item/>
              </li>
            </ul> */}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
