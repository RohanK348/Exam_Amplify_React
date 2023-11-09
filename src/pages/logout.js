import React from 'react'
import Layout from '../layouts/centered'
import {Link} from 'react-router-dom'

const Logout = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full max-w-xl text-center">
        <img
          className="object-contain w-auto h-64 mb-8"
          src="/pages/error-page/illustration.svg"
          alt="svg"
        />
        <div className="mb-8 text-center text-grey-900">
          You have succesfully signed out.
        </div>

        <div className="flex w-full">
          <Link
            to="/"
            className="btn btn-lg btn-rounded btn-block bg-blue-500 hover:bg-blue-600 text-white">
            Go back
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Logout
