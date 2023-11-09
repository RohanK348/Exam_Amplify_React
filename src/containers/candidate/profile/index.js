import React, {useState, useEffect} from 'react'

import SectionTitle from '../../../components/section-title'
import {UnderlinedTabs} from '../../../components/tabs'
import Account from './account'
import PersonalInformation from './personalInformation'
import Career from './career'
import Education from './education/index'
import {get as getUser} from '../../../api/user'
import {useAsync} from '../../../functions/utils'
import {useSetting} from '../../../provider/setting'

const Prfile = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const [user, setUser] = useState(null)
  const tabs = [
    {
      index: 0,
      title: 'Personal Information',
      content: (
        <div className="py-4 w-full">
          <PersonalInformation user={user} />
        </div>
      )
    },
    {
      index: 1,
      title: 'Career',
      content: (
        <div className="py-4 w-full">
          <Career user={user} />
        </div>
      )
    },
    {
      index: 2,
      title: 'Education',
      content: (
        <div className="py-4 w-full">
          <Education user={user} />
        </div>
      )
    },
    {
      index: 3,
      title: 'Account',
      content: (
        <div className="py-4 w-full">
          <Account user={user} />
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
      <SectionTitle title="Candidate" subtitle="Profile" />

      <div className="flex flex-wrap">
        <div className="w-full p-4">
          <UnderlinedTabs tabs={tabs} />
        </div>
      </div>
    </>
  )
}

export default Prfile
