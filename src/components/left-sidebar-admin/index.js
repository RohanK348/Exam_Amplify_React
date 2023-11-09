import React from 'react'
import {
  // FiToggleLeft,
  FiList,
  FiActivity,
  // FiCalendar,
  FiStar,
  // FiDroplet,
  FiGrid,
  // FiClock,
  FiCopy,
  FiUser,
  // FiPieChart,
  // FiMap,
  FiCompass,
  // FiHelpCircle,
  FiShoppingCart,
  // FiHome,
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
            <Item url="/admin/topic" icon={<FiGrid size={20} />} title="Topic" isRoot={false}/>
            <Item url="/admin/allQuestion" icon={<FiList size={20} />} title="Question" isRoot={false}/>
            <Item url="/admin/company" icon={<FiActivity size={20} />} title="Company" isRoot={false}/>
            <Item icon={<FiCopy size={20} />} title="Template" isRoot={true}/>
            <ul>
              <li className="l1">
                <Item url="/admin/template" title="Full Template" isRoot={false}/>
              </li>
              <li className="l1">
                <Item url="/admin/simpleTemplate" title="Simple Template" isRoot={false}/>
              </li>
              <li className="l1">
                <Item url="/admin/department" title="Improve Template" isRoot={false}/>
              </li>
            </ul>
            <Item url="/admin/exam" icon={<FiCompass size={20} />} title="Exam" isRoot={false}/>
            <Item icon={<FiStar size={20} />} title="Result" isRoot={true}/>
            <ul>
              <li className="l1">
                <Item title="Empowerr" isRoot={true}/>
                <ul>
                  <li className="l1">
                    <Item url="/admin/result/empowerr" title="Exam" isRoot={false}/>
                  </li>
                  <li className="l1">
                    <Item url="/admin/result/cumulative/empowerr" title="Cumulative" isRoot={false}/>
                  </li>
                </ul>
              </li>
              <li className="l1">
                <Item title="Corporate" isRoot={true}/>
                <ul>
                  <li className="l1">
                    <Item url="/admin/result/company" title="Exam" isRoot={false}/>
                  </li>
                  <li className="l1">
                    <Item url="/admin/result/cumulative/company" title="Cumulative" isRoot={false}/>
                  </li>
                </ul>
              </li>
            </ul>
            <Item title="Price" icon={<FiShoppingCart size={20} />} isRoot={true}/>
            <ul>
              <li className="l1">
                <Item url="/admin/price/setting" title="Setting" isRoot={false}/>
              </li>
              <li className="l1">
                <Item url="/admin/company/price" title="Corporate" isRoot={false}/>
              </li>
              <li className="l1">
                <Item url="/admin/candidate/price" title="Candidate" isRoot={false}/>
              </li>
            </ul>
            <Item url="/admin/company/verify" icon={<FiUser size={20} />} title="Company Verify" isRoot={false}/>
            <Item url="/admin/user/block" icon={<FiUser size={20} />} title="User Block" isRoot={false}/>
            <Item url="/logout" icon={<FiLogIn size={20} />} title="Logout" isRoot={false}/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
