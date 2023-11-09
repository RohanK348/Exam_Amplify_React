import React from 'react'
import SectionTitle from '../components/section-title'
import {UnderlinedTabs} from '../components/tabs'
import AccountSettings from '../components/sample-forms/account-settings'
import EmailPreferences from '../components/sample-forms/email-preferences'
import SecuritySettings from '../components/sample-forms/security-settings'
import {FiTwitter, FiFacebook, FiInstagram} from 'react-icons/fi'
import Widget from '../components/social-feed/widget'

const tabs = [
  {
    index: 0,
    title: 'Account settings',
    content: (
      <div className="py-4 w-full lg:w-1/2">
        <AccountSettings />
      </div>
    )
  },
  {
    index: 1,
    title: 'Email preferences',
    content: (
      <div className="py-4 w-full lg:w-1/2">
        <EmailPreferences />
      </div>
    )
  },
  {
    index: 2,
    title: 'Security settings',
    content: (
      <div className="py-4 w-full lg:w-1/2">
        <SecuritySettings />
      </div>
    )
  }
]
const Index = () => (
  <>
    <SectionTitle title="Pages" subtitle="User profile" />

    <Widget>
      <div className="flex flex-row items-center justify-start p-4">
        <div className="flex-shrink-0 w-24">
          <img
            src="/assets/faces/m1.png"
            alt="media"
            className="shadow rounded-full h-20 w-20 shadow-outline mb-2"
          />
        </div>
        <div className="py-2 px-2">
          <p className="text-base font-bold whitespace-no-wrap">Lucas Smith</p>
          <p className="text-sm text-grey-500 whitespace-no-wrap">
            Vital Database Dude
          </p>
          <div className="flex flex-row items-center justify-start w-full py-1 space-x-2">
            <FiTwitter className="stroke-current text-xl text-twitter" />
            <FiFacebook className="stroke-current text-xl text-facebook" />
            <FiInstagram className="stroke-current text-xl text-instagram" />
          </div>
        </div>
        <div className="ml-auto flex-shrink-0 space-x-2 hidden lg:flex">
          <button className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white">
            Subscribe
          </button>
          <button className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white">
            Follow
          </button>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full p-4">
          <UnderlinedTabs tabs={tabs} />
        </div>
      </div>
    </Widget>
  </>
)

export default Index
