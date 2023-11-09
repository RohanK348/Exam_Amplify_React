import React from 'react'
import PropTypes from 'prop-types'
import '../../css/components/section-title.css'

const SectionTitle = ({title, subtitle, right = null}) => {
  return (
    <div className="section-title">
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="title text-grey-500">{title}</div>
          <div className="subtitle">{subtitle}</div>
        </div>
        {right}
      </div>
    </div>
  )
}

SectionTitle.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  right: PropTypes.any
}
export default SectionTitle
