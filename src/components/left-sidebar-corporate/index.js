import React from 'react'
import {
  // FiToggleLeft,
  // FiList,
  // FiActivity,
  // FiCalendar,
  // FiStar,
  // FiDroplet,
  FiGrid,
  // FiClock,
  FiCopy,
  // FiUser,
  // FiPieChart,
  // FiMap,
  // FiCompass,
  // FiHelpCircle,
  FiShoppingCart,
  FiHome,
  FiLogIn
} from 'react-icons/fi'
// import {useSelector, shallowEqual} from 'react-redux'
import Item from './item'
import Logo from './logo'
import '../../css/components/left-sidebar-1.css'

const Sidebar = () => {
  return (
    <div className="left-sidebar left-sidebar-1">
      <Logo />
      <div>
        {/* <div className="left-sidebar-title">
          <span>Question</span>
        </div> */}
        <ul>
          <li className="l0">
            <Item url="/corporate" icon={<FiHome size={20} />} title="Dashboard" isRoot={false}/>
            <Item url="/corporate/opening" icon={<FiGrid size={20} />} title="Opening" isRoot={false}/>
            <Item icon={<FiCopy size={20} />} title="Template" isRoot={true} />
            <ul>
              <li className="l1">
                <Item url="/corporate/simpleTemplate" title="Simple Template" isRoot={false}/>
              </li>
              <li className="l1">
                <Item url="/corporate/improveTemplate" title="Improve Template" isRoot={false}/>
              </li>
            </ul>
            <Item url="/corporate/payment" icon={<FiShoppingCart size={20} />} title="Buy Now" isRoot={false}/>
            <Item url="/logout" icon={<FiLogIn size={20} />} title="Logout" isRoot={false}/>
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
