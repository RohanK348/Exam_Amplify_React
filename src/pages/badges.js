import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import {Badge, CircularBadge} from '../components/badges'

const Badges = () => {
  return (
    <>
      <SectionTitle title="UI Elements" subtitle="Badges" />

      <Widget
        title="Default badges"
        description={
          <span>
            Use the <code>&lt;Badge /&gt;</code> component for simple badges.
            Use the <code>&lt;CircularBadge /&gt;</code> component for circular
            badges. Use the <code>rounded</code> prop for rounded badges.
          </span>
        }>
        <div className="flex flex-wrap items-center justify-start mb-2 w-full space-x-2">
          {['lg', 'default', 'sm'].map((size, i) => (
            <Badge key={i} size={size} color="bg-blue-500 text-white">
              Default
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-start mb-2 w-full space-x-2">
          {['lg', 'default', 'sm'].map((size, i) => (
            <Badge key={i} size={size} color="bg-blue-500 text-white" rounded>
              Default
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-start mb-2 w-full space-x-2">
          {['lg', 'default', 'sm'].map((size, i) => (
            <CircularBadge key={i} size={size} color="bg-blue-500 text-white">
              1
            </CircularBadge>
          ))}
        </div>
      </Widget>

      <Widget
        title="Outlined badges"
        description={
          <span>
            Use the <code>outlined</code> prop for outlined badges.
          </span>
        }>
        <div className="flex flex-wrap items-center justify-start mb-2 w-full space-x-2">
          {['lg', 'default', 'sm'].map((size, i) => (
            <Badge
              key={i}
              size={size}
              color="border-blue-500 text-blue-500"
              outlined>
              Default
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-start mb-2 w-full space-x-2">
          {['lg', 'default', 'sm'].map((size, i) => (
            <Badge
              key={i}
              size={size}
              color="border-blue-500 text-blue-500"
              rounded
              outlined>
              Default
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-start mb-2 w-full space-x-2">
          {['lg', 'default', 'sm'].map((size, i) => (
            <CircularBadge
              key={i}
              size={size}
              color="border-blue-500 text-blue-500"
              outlined>
              1
            </CircularBadge>
          ))}
        </div>
      </Widget>

      <Widget
        title="Alternative colors"
        description={
          <span>
            Use the <code>alt</code> prop for badges with alternative colors.
          </span>
        }>
        <div className="flex flex-wrap items-center justify-start mb-2 w-full space-x-2">
          {['lg', 'default', 'sm'].map((size, i) => (
            <Badge key={i} size={size} color="bg-blue-200 text-blue-600" alt>
              Default
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-start mb-2 w-full space-x-2">
          {['lg', 'default', 'sm'].map((size, i) => (
            <Badge
              key={i}
              size={size}
              color="bg-blue-200 text-blue-600"
              rounded
              alt>
              Default
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-start mb-2 w-full space-x-2">
          {['lg', 'default', 'sm'].map((size, i) => (
            <CircularBadge
              key={i}
              size={size}
              color="bg-blue-200 text-blue-600"
              alt>
              1
            </CircularBadge>
          ))}
        </div>
      </Widget>
    </>
  )
}
export default Badges
