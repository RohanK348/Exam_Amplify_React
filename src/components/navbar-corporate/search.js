import React from 'react'
import {FiSearch} from 'react-icons/fi'

const Search = () => {
  return (
    <form className="w-full max-w-xs mr-2 navbar-search">
      <div className="relative">
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className="pl-10 pr-5 appearance-none h-10 w-full rounded-full text-sm focus:outline-none"
        />
        <button type="submit" className="absolute top-0 mt-3 left-0 ml-4">
          <FiSearch className="stroke-current h-4 w-4" />
        </button>
      </div>
    </form>
  )
}

export default Search
