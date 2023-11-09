import React, {useState, useEffect} from 'react'

import SectionTitle from '../../../components/section-title'
import {UnderlinedTabs} from '../../../components/tabs'
import CompanyDetail from './companyDetail'
import PersonalDetail from './personalDetail'
import Account from './acount'
import {get as getUser} from '../../../api/user'
import {useAsync} from '../../../functions/utils'
import {useSetting} from '../../../provider/setting'


const Index = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const [user, setUser] = useState(null)
  const tabs = [
    {
      index: 0,
      title: 'Company Detail',
      content: (
        <div className="py-4 w-full">
          <CompanyDetail user={user} />
        </div>
      )
    },
    {
      index: 1,
      title: 'Personal Detail',
      content: (
        <div className="py-4 w-full">
          <PersonalDetail user={user} />
        </div>
      )
    },
    {
      index: 2,
      title: 'Account',
      content: (
        <div className="py-4 w-full">
          <Account />
        </div>
      )
    }
  ]

  useEffect(() => {
    if (setting.auth) {
      run(getUser(setting.auth.id))
    }
  }, [setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      setUser(data)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [run, status])
  return (
  <>
    <SectionTitle title="Corporate" subtitle="Campany profile" />

    <div className="flex flex-wrap">
      <div className="w-full p-4">
        <UnderlinedTabs tabs={tabs} />
      </div>
    </div>
  </>
)}

export default Index
