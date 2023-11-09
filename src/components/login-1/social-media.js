import React from 'react'
import {FiTwitter, FiFacebook, FiGithub} from 'react-icons/fi'

const SocialMedia = () => {
  return (
    <div className="w-full flex flex-col text-center">
      <div className="mb-2">Or sign up with</div>
      <div className="flex w-full flex-row justify-center items-center space-x-2">
        <button className="btn btn-circle bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent">
          <FiFacebook className="stroke-current text-xl text-facebook" />
        </button>
        <button className="btn btn-circle bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent">
          <FiTwitter className="stroke-current text-xl text-twitter" />
        </button>
        <button className="btn btn-circle bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent">
          <FiGithub className="stroke-current text-xl text-github" />
        </button>
      </div>
    </div>
  )
}

export default SocialMedia
