import React from 'react'
import flags from '../../json/navbar-flags.json'
import {Link} from 'react-router-dom'

const Countries = () => (
  <>
    <div className="dropdown-title">Change country</div>
    <div className="flex flex-wrap">
      {flags.map((item, i) => (
        <Link
          to="/"
          key={i}
          className="w-1/2 flex items-center justify-start p-2 text-sm space-x-2 dropdown-item">
          <span className={`text-base flag-icon flag-icon-${item.code}`}></span>
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  </>
)

export default Countries
