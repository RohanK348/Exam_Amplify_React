import React from 'react'
import {FiSearch} from 'react-icons/fi'

const Search = () => (
  <div className="flex flex-col flex-wrap w-full items-center justify-center mt-8 mb-4">
    <div className="text-2xl mb-2">Hello, how can we help you?</div>
    <div className="w-full flex flex-row items-center justify-center">
      <div className="relative w-full max-w-lg mb-2">
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className="w-full appearance-none h-10 pl-10 pr-5 rounded-full text-sm bg-grey-100 focus:outline-none"
        />
        <button type="submit" className="absolute top-0 mt-3 left-0 ml-4">
          <FiSearch className="stroke-current h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="text-sm text-grey-500">
      Popular topics: Installation, create-react-app, Tailwind CSS
    </div>
  </div>
)
export default Search
