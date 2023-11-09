import React from 'react'
import SectionTitle from '../components/section-title'
import Modal1 from '../components/modals/modal-1'
import Modal2 from '../components/modals/modal-2'
import Modal3 from '../components/modals/modal-3'
import Widget from '../components/widget'
import {FiX, FiCheck} from 'react-icons/fi'

const Index = () => {
  return (
    <>
      <SectionTitle title="Notifications" subtitle="Modals" />
      <Widget
        title="Default modals"
        description={
          <span>
            Use the <code>&lt;Modal1 /&gt;</code> component to show a simple
            modal window. Use the <code>title</code> and <code>body</code> props
            to customize the title and body
          </span>
        }>
        <Modal1
          title="Modal title"
          body={
            <div>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
              vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
              amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
              placerat eleifend leo.
            </div>
          }
        />
      </Widget>
      <Widget
        title="Default modals"
        description={
          <span>
            Use the <code>&lt;Modal2 /&gt;</code> component to show a simple
            modal window. Use the <code>title</code>, <code>icon</code>,{' '}
            <code>buttonTitle</code>, <code>buttonClassName</code> and{' '}
            <code>body</code> props to customize the modal components
          </span>
        }>
        <Modal2
          title="Close account"
          icon={
            <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
              <FiX size={18} className="stroke-current text-red-500" />
            </span>
          }
          body={
            <div className="text-sm text-grey-500">
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
              vitae, ultricies eget, tempor sit amet, ante.
            </div>
          }
          buttonTitle="Close account"
          buttonClassName="btn btn-default btn-rounded bg-red-500 hover:bg-red-600 text-white"
        />
      </Widget>
      <Widget
        title="Default modals"
        description={
          <span>
            Use the <code>&lt;Modal3 /&gt;</code> component to show a simple
            modal window. Use the <code>title</code>, <code>icon</code>,{' '}
            <code>buttonTitle</code>, <code>buttonClassName</code> and{' '}
            <code>body</code> props to customize the modal components
          </span>
        }>
        <Modal3
          title="Payment successful"
          icon={
            <span className="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
              <FiCheck size={18} className="stroke-current text-green-500" />
            </span>
          }
          body={
            <div className="text-sm text-grey-500">
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
              vitae, ultricies eget, tempor sit amet, ante.
            </div>
          }
          buttonTitle="Go back"
          buttonClassName="btn btn-default btn-rounded bg-blue-500 text-white hover:bg-blue-600 w-full"
        />
      </Widget>
    </>
  )
}
export default Index
