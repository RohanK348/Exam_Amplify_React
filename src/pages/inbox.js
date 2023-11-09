import React from 'react'
import {Link} from 'react-router-dom'
import Inbox from '../components/inbox'
import Categories from '../components/inbox/categories'
import Labels from '../components/inbox/labels'
import Links from '../components/inbox/links'

const Index = () => (
  <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
    <div className="flex items-start justify-start w-full">
      <div className="flex-shrink-0 w-64 p-4">
        <div className="mb-4">
          <Link
            to="/compose"
            className="btn btn-default btn-block rounded bg-blue-500 hover:bg-blue-600 text-white block text-center">
            Compose email
          </Link>
        </div>
        <Links />
        <Categories />
        <Labels />
      </div>
      <div className="w-full flex flex-col p-4">
        <Inbox />
      </div>
    </div>
  </div>
)
export default Index
