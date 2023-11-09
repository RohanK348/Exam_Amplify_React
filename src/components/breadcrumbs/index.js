import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {
  FiHome,
  FiChevronRight,
  FiChevronsRight,
  FiArrowRight
} from 'react-icons/fi'

const Breadcrumb = ({home = false, icon = 'arrow', items}) => (
  <nav className="w-full flex">
    <ol className="list-none flex flex-row items-center justify-start">
      {home && (
        <li className="mr-2 flex items-center">
          <FiHome className="h-3 w-3 stroke-current" />
        </li>
      )}
      {items.map((item, i) => (
        <li className="flex items-center" key={i}>
          <Link to={item.url} className="mr-2">{item.title}</Link>
          {!item.last && icon === 'arrow' && (
            <FiArrowRight className="h-3 w-3 mr-2 stroke-current" />
          )}
          {!item.last && icon === 'chevron' && (
            <FiChevronRight className="h-3 w-3 mr-2 stroke-current" />
          )}
          {!item.last && icon === 'chevrons' && (
            <FiChevronsRight className="h-3 w-3 mr-2 stroke-current" />
          )}
        </li>
      ))}
    </ol>
  </nav>
)
Breadcrumb.propTypes = {
  home: PropTypes.bool,
  icon: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      home: PropTypes.bool,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      last: PropTypes.bool.isRequired
    })
  ).isRequired
}
export default Breadcrumb
