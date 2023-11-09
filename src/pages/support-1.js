import React from 'react'
import {FiSlack, FiGithub} from 'react-icons/fi'
import SectionTitle from '../components/section-title'
import Faq from '../components/faq'
import Features from '../components/support/features'
import Search from '../components/support/search'
import Title from '../components/support/title'
import Widget1 from '../components/support/widget-1'

const Index = () => (
  <>
    <SectionTitle title="Pages" subtitle="Support" />
    <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
      <Search />
      <Features />
      <Title
        title="Most helpful articles"
        description="Start here to find best possible answers from our experts"
      />
      <div className="w-full mb-8">
        <Faq />
      </div>
      <div className="w-full text-center items-center justify-center mb-8">
        <button className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white">
          View all articles
        </button>
      </div>
      <Title
        title="Community help"
        description="Get your answers from our network of users"
      />
      <div className="w-full flex items-center justify-start py-3 px-6 bg-blue-500 text-white mb-8">
        <div className="flex flex-col w-full">
          <div className="text-lg">Can't find what you're looking for?</div>
          <div className="text-base">Let us help you right now!</div>
        </div>
        <div className="flex-shrink-0">
          <button className="btn btn-default btn-rounded bg-white hover:bg-grey-100 text-blue-500">
            Submit a request
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center mb-8">
        <div className="w-1/2">
          <Widget1
            icon={<FiSlack className="stroke-current text-3xl text-blue-500" />}
            title="Slack channel"
            description="Welcome to our Slack channel"
          />
        </div>
        <div className="w-1/2">
          <Widget1
            icon={
              <FiGithub className="stroke-current text-3xl text-blue-500" />
            }
            title="Github issues"
            description="Welcome to our github issues repository"
          />
        </div>
      </div>
    </div>
  </>
)
export default Index
