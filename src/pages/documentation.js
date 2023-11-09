import React from 'react'
import {UnderlinedTabs} from '../components/tabs'
import SectionTitle from '../components/section-title'
import {
  Intro,
  Instructions,
  TemplateStructure
} from '../components/documentation/installation'
import {
  CodeStructure,
  NamingConventions,
  Folders,
  Files
} from '../components/documentation/code-structure'
import {Customization} from '../components/documentation/faq'
import {Credits} from '../components/documentation/credits'
import {ChangeLog} from '../components/documentation/change-log'
import {Tree} from '../components/documentation/tree'

const InstallationTab = () => (
  <div className="w-full">
    <Intro />
    <Instructions />
    <TemplateStructure />
  </div>
)

const CodeStructureTab = () => (
  <div className="w-full">
    <CodeStructure />
    <NamingConventions />
    <Folders />
    <Files />
    <Tree />
  </div>
)

const FaqTab = () => (
  <div className="w-full">
    <Customization />
  </div>
)

const CreditsTab = () => (
  <div className="w-full">
    <Credits />
  </div>
)

const ChangeLogTab = () => (
  <div className="w-full">
    <ChangeLog />
  </div>
)

const Index = () => {
  const tabs = [
    {index: 0, title: 'Installation', content: <InstallationTab />},
    {index: 1, title: 'Code structure', content: <CodeStructureTab />},
    {index: 2, title: 'FAQ', content: <FaqTab />},
    {index: 3, title: 'Credits', content: <CreditsTab />},
    {index: 4, title: 'Change log', content: <ChangeLogTab />}
  ]
  return (
    <>
      <SectionTitle title="Documentation" subtitle="Dashboard documentation" />
      <div className="flex flex-wrap">
        <div className="w-full">
          <UnderlinedTabs tabs={tabs} />
        </div>
      </div>
    </>
  )
}
export default Index
