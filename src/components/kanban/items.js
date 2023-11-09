import React from 'react'
import {Badge} from '../badges'

export const Item1 = ({img, title, subtitle, badges}) => (
  <div className="flex flex-col p-2 w-full">
    <div className="flex items-start justify-start mb-2">
      <div className="flex-shrink-0 w-8">
        <img
          src={img}
          alt="media"
          className="h-8 shadow-lg rounded-full w-full"
        />
      </div>
      <div className="ml-2">
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs text-grey-500">{subtitle}</div>
      </div>
    </div>
    <div className="flex flex-row items-center justify-start space-x-1">
      {badges.map((badge, i) => (
        <Badge key={i} size="sm" color={badge.color} rounded>
          {badge.title}
        </Badge>
      ))}
    </div>
  </div>
)
