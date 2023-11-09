import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../layouts/empty'
import Logo from '../components/landing/logo'
import Icons from '../components/landing/icons'
import Images from '../components/landing/images'
import Title from '../components/landing/title'
import Text from '../components/landing/text'
import Features from '../components/landing/features'
import Options from '../components/landing/options'
import Screenshots from '../components/landing/screenshots'

const Index = () => (
  <Layout>
    <div className="container max-w-screen-lg mx-auto lg:px-4">
      <div className="bg-white text-default w-full py-4 flex items-center justify-around px-4">
        <Logo />
        <div className="hidden lg:flex lg:flex-row whitespace-no-wrap">
          <Link to="/documentation" className="btn btn-default">
            Documentation
          </Link>
          <a
            href="https://themeforest.net/item/dboard-react-admin-template/27515620"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-default btn-outlined bg-transparent text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700 btn-rounded">
            Purchase now
          </a>
        </div>
      </div>
      {/*section*/}
      <div className="mb-4 lg:mb-16 pt-4 lg:pt-24">
        <div className="flex flex-wrap items-center">
          <div className="w-full p-4 lg:w-3/5">
            <Title />
            <Text />
            <div className="flex flex-row items-center justify-start mb-6">
              <Icons />
            </div>
            <div className="flex flex-row items-center justify-start">
              <a
                href="https://themeforest.net/item/dboard-react-admin-template/27515620"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-default btn-outlined bg-transparent text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700 btn-rounded">
                Purchase now
              </a>
            </div>
          </div>
          <div className="hidden lg:flex lg:w-2/5">
            <Images />
          </div>
        </div>
      </div>

      {/*section*/}
      <Options />

      {/*section*/}
      <Features />

      {/*section*/}
      <Screenshots />

      <div className="text-center text-xs text-gray-400 pb-4">
        &copy; 2020 Mobifica
      </div>
    </div>
  </Layout>
)

export default Index
