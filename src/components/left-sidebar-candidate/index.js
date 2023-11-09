import React from 'react'
import {
  // FiToggleLeft,
  // FiList,
  // FiActivity,
  // FiCalendar,
  FiStar,
  FiDroplet,
  // FiGrid,
  // FiClock,
  // FiCopy,
  // FiUser,
  // FiPieChart,
  // FiMap,
  FiCompass,
  // FiShoppingCart,
  FiHome,
  FiLogIn
} from 'react-icons/fi'
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
            <Item url="/dashboard" icon={<FiHome size={20} />} title="Dashboard" isRoot={false}/>
            <Item url="/company" icon={<FiDroplet size={20} />} title="Company" isRoot={false}/>
            <Item url="/empowerr" icon={<FiDroplet size={20} />} title="Empowerr Exam" isRoot={false}/>
            <Item icon={<FiStar size={20} />} title="Premium" isRoot={true}/>
            <ul>
              <li>
                <Item url="/train" title="Train" isRoot={false}/>
              </li>
              <li>
                <Item title="Result" isRoot={true}/>
                <ul>
                  <li className="l1">
                    <Item url="/result/company" title="Campany" isRoot={false}/>
                  </li>
                  <li className="l1">
                    <Item url="/result/empowerr" title="Empowerr" isRoot={false}/>
                  </li>
                  <li className="l1">
                    <Item url="/result/train" title="Train" isRoot={false}/>
                  </li>
                </ul>
                <Item title="Cumulative" isRoot={true}/>
                <ul>
                  <li className="l1">
                    <Item url="/cumulative/company" title="Campany" isRoot={false}/>
                  </li>
                  <li className="l1">
                    <Item url="/cumulative/empowerr" title="Empowerr" isRoot={false}/>
                  </li>
                </ul>
              </li>
            </ul>
            
            <Item url="/logout" icon={<FiLogIn size={20} />} title="Logout" isRoot={false}/>
            
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
