import React from 'react'
import {useParams} from 'react-router-dom'

import SectionTitle from '../../../../components/section-title'
import {UnderlinedTabs} from '../../../../components/tabs'
import Widget from '../../../../components/social-feed/widget'
import Exam from '../../exam/index'
import Detail from './detail'
import AppliedStudents from '../../students/applied'

const Index = () => {
  const {id} = useParams()
  const tabs = [
    {
      index: 0,
      title: 'Details',
      content: (
        <div className="py-4 w-full">
          <Detail id={id} />
        </div>
      )
    },
    {
      index: 1,
      title: 'Exams',
      content: (
        <div className="py-4 w-full">
          <Exam id={id} />
        </div>
      )
    },
    {
      index: 2,
      title: 'Applied Students',
      content: (
        <div className="py-4 w-full">
          <AppliedStudents id={id} />
        </div>
      )
    }
  ]

  return (
  <>
    <SectionTitle title="Corporate" subtitle="Opening Details" />

    <Widget>
      <div className="flex flex-wrap">
        <div className="w-full p-4">
          <UnderlinedTabs tabs={tabs} />
        </div>
      </div>
    </Widget>
  </>
)}

export default Index
