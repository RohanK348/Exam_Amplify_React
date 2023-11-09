import React from 'react'
import PropTypes from 'prop-types'

export const Badge = ({
  rounded = false,
  outlined = false,
  size = 'default',
  color,
  children
}) => {
  let css = []
  css.push(color)
  if (rounded) css.push('rounded-lg')
  if (size === 'default') {
    css.push('text-xs px-2 py-1')
  }
  if (size === 'sm') {
    css.push('text-2xs px-2 py-0')
  }
  if (size === 'lg') {
    css.push('text-xs px-2 py-2')
  }
  css = css.join(' ')
  if (outlined) {
    return (
      <span
        className={`uppercase font-bold inline-flex text-center bg-transparent border border-current ${css}`}>
        {children}
      </span>
    )
  }
  return (
    <span
      className={`uppercase font-bold inline-flex text-center badge-${size} ${css}`}>
      {children}
    </span>
  )
}
Badge.propTypes = {
  size: PropTypes.oneOf(['sm', 'default', 'lg']),
  rounded: PropTypes.bool,
  outlined: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.any
}

export const CircularBadge = ({
  size = 'default',
  outlined = false,
  color,
  children
}) => {
  let css = []
  css.push(color)
  if (size === 'sm') {
    css.push(
      'text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full'
    )
  } else if (size === 'lg') {
    css.push(
      'text-xs h-8 w-8 inline-flex items-center justify-center rounded-full'
    )
  } else {
    css.push(
      'text-2xs h-6 w-6 inline-flex items-center justify-center rounded-full'
    )
  }
  css = css.join(' ')
  if (outlined) {
    return (
      <span
        className={`uppercase font-bold inline-flex text-center p-0 leading-none
        bg-transparent border border-current
        ${css}`}>
        {children}
      </span>
    )
  }
  return (
    <span
      className={`uppercase font-bold inline-flex text-center p-0 leading-none ${css}`}>
      {children}
    </span>
  )
}

CircularBadge.propTypes = {
  size: PropTypes.oneOf(['sm', 'default', 'lg']),
  color: PropTypes.string,
  children: PropTypes.any
}
