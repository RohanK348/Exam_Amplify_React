import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import Notification from '../components/notifications'
import {FiAlertCircle} from 'react-icons/fi'

const Index = () => {
  const items = [
    {
      btnTitle: 'on top of page',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames: 'z-50 h-auto w-full p-0',
      innerClassNames: 'bg-blue-500 text-white',
      animation: 'block',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is an important message!</span>
    },
    {
      btnTitle: 'fixed on top',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames: 'z-50 transform fixed top-0 left-0 h-auto w-full p-0',
      innerClassNames: 'bg-green-500 text-white',
      animation: 'animate__animated animate__fadeInDown',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is an important message!</span>
    },
    {
      btnTitle: 'fixed on bottom',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames:
        'z-50 transform fixed inset-x-0 bottom-0 h-auto w-full p-0',
      innerClassNames: 'bg-blue-500 text-white',
      animation: 'animate__animated animate__fadeInUp',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is an important message!</span>
    },
    {
      btnTitle: 'fixed on bottom with padding',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames:
        'z-50 transform fixed inset-x-0 bottom-0 h-auto w-full p-6',
      innerClassNames: 'bg-white text-grey-900 shadow-lg rounded-lg',
      animation: 'animate__animated animate__bounceIn',
      icon: (
        <FiAlertCircle className="mr-2 stroke-current h-4 w-4 text-blue-500" />
      ),
      content: (
        <>
          <span>This is a </span>
          <span className="font-bold">very important message!</span>
        </>
      )
    }
  ]
  const positions = [
    {
      btnTitle: 'on top left corner',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames: 'z-50 transform fixed top-0 left-0 h-auto w-96 p-4',
      innerClassNames: 'bg-red-500 text-white',
      animation: 'animate__animated animate__fadeInLeft',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is important message!</span>
    },
    {
      btnTitle: 'on top right corner',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames: 'z-50 transform fixed top-0 right-0 h-auto w-96 p-4',
      innerClassNames: 'bg-blue-500 text-white',
      animation: 'animate__animated animate__fadeInRight',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is important message!</span>
    },
    {
      btnTitle: 'on bottom left corner',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames: 'z-50 transform fixed bottom-0 left-0 h-auto w-96 p-4',
      innerClassNames: 'bg-green-500 text-white',
      animation: 'animate__animated animate__fadeInLeft',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is important message!</span>
    },
    {
      btnTitle: 'on bottom right corner',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames: 'z-50 transform fixed bottom-0 right-0 h-auto w-96 p-4',
      innerClassNames: 'bg-amber-500 text-white',
      animation: 'animate__animated animate__fadeInRight',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is important message!</span>
    }
  ]
  const animations = [
    {
      btnTitle: 'Tada',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames: 'z-50 transform fixed top-0 left-0 h-auto w-96 p-4',
      innerClassNames: 'bg-red-500 text-white',
      animation: 'animate__animated animate__tada',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is important message!</span>
    },
    {
      btnTitle: 'Back in right',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames: 'z-50 transform fixed top-0 right-0 h-auto w-96 p-4',
      innerClassNames: 'bg-blue-500 text-white',
      animation: 'animate__animated animate__backInRight',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is important message!</span>
    },
    {
      btnTitle: 'bounce in left',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames: 'z-50 transform fixed bottom-0 left-0 h-auto w-96 p-4',
      innerClassNames: 'bg-green-500 text-white',
      animation: 'animate__animated animate__bounceInLeft',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is important message!</span>
    },
    {
      btnTitle: 'flip in y',
      btnClassNames: 'btn btn-default btn-rounded',
      outerClassNames: 'z-50 transform fixed bottom-0 right-0 h-auto w-96 p-4',
      innerClassNames: 'bg-amber-500 text-white',
      animation: 'animate__animated animate__flipInY',
      icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
      content: <span>This is important message!</span>
    }
  ]
  return (
    <>
      <SectionTitle title="Notifications" subtitle="Custom notifications" />
      <Widget
        title="Full page width notifications"
        description={
          <span>
            Use the <code>.outerClassNames</code> Tailwind CSS classes to
            generate full page width notification with the{' '}
            <code>&lt;Notification /&gt;</code> component.
          </span>
        }>
        <div className="flex flex-wrap w-full">
          {items.map((item, i) => (
            <Notification {...item} key={i} />
          ))}
        </div>
      </Widget>
      <Widget
        title="Notification positions"
        description={
          <span>
            Use Tailwind CSS classes to position your notifications in different
            places
          </span>
        }>
        <div className="flex flex-wrap w-full">
          {positions.map((item, i) => (
            <Notification {...item} key={i} />
          ))}
        </div>
      </Widget>
      <Widget
        title="Notification animations"
        description={
          <span>
            Use the <code>Animate.css</code> classes to add custom animations to
            your notifications
          </span>
        }>
        <div className="flex flex-wrap w-full">
          {animations.map((item, i) => (
            <Notification {...item} key={i} />
          ))}
        </div>
      </Widget>
    </>
  )
}
export default Index

