import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import Dropdown from '../components/dropdowns/dropdown-1'
import {
  FiHome,
  FiUser,
  FiMessageSquare,
  FiSettings,
  FiMapPin,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiLinkedin
} from 'react-icons/fi'

const DropdownContent = () => {
  const items = [
    {
      title: 'Home',
      icon: <FiHome className="stroke-current text-xl" />
    },
    {
      title: 'Account',
      icon: <FiUser className="stroke-current text-xl" />
    },
    {
      title: 'Comments',
      icon: <FiMessageSquare className="stroke-current text-xl" />
    },
    {
      title: 'Settings',
      icon: <FiSettings className="stroke-current text-xl" />
    },
    {
      title: 'Maps',
      icon: <FiMapPin className="stroke-current text-xl" />
    },
    {
      title: 'Twitter',
      icon: <FiTwitter className="stroke-current text-xl" />
    },
    {
      title: 'Facebook',
      icon: <FiFacebook className="stroke-current text-xl" />
    },
    {
      title: 'Instagram',
      icon: <FiInstagram className="stroke-current text-xl" />
    },
    {
      title: 'LinkedIn',
      icon: <FiLinkedin className="stroke-current text-xl" />
    }
  ]
  return (
    <>
      <div className="dropdown-title">Apps</div>
      <div className="flex flex-wrap text-center">
        {items.map((item, i) => (
          <div
            key={i}
            className="w-1/3 flex flex-col items-center justify-center h-20 space-y-1 dropdown-item">
            {item.icon}
            <span className="text-xs">{item.title}</span>
          </div>
        ))}
      </div>
    </>
  )
}

const Index = () => (
  <>
    <SectionTitle title="UI Elements" subtitle="Dropdowns" />
    {['bottom'].map((placement, i) => (
      <Widget
        title="Dropdowns"
        description={<span className="capitalize">{placement} position</span>}>
        <div className="flex flex-row mb-4" key={i}>
          <div className="w-1/4">
            <Dropdown
              width="w-64"
              placement={`${placement}-start`}
              title={`dropdown left`}
              dropdownToggleClass="btn btn-default btn-outlined btn-outlined-indigo">
              <DropdownContent />
            </Dropdown>
          </div>
          <div className="w-1/4">
            <Dropdown
              width="w-64"
              placement={`${placement}-end`}
              title={`dropdown right`}
              dropdownToggleClass="btn btn-default btn-outlined btn-outlined-indigo">
              <DropdownContent />
            </Dropdown>
          </div>
        </div>
      </Widget>
    ))}
    {['right', 'left'].map((placement, i) => (
      <Widget
        title="Dropdowns"
        description={<span className="capitalize">{placement} position</span>}>
        <div className="flex flex-row mb-4" key={i}>
          <div className="w-1/4">
            <Dropdown
              width="w-64"
              placement={`${placement}-start`}
              title={`dropdown end`}
              dropdownToggleClass="btn btn-default btn-outlined btn-outlined-indigo">
              <DropdownContent />
            </Dropdown>
          </div>
          <div className="w-1/4">
            <Dropdown
              width="w-64"
              placement={`${placement}-end`}
              title={`dropdown start`}
              dropdownToggleClass="btn btn-default btn-outlined btn-outlined-indigo">
              <DropdownContent />
            </Dropdown>
          </div>
        </div>
      </Widget>
    ))}
  </>
)
export default Index
