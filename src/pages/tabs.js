import React from 'react'
import SectionTitle from '../components/section-title'
import {
  DefaultTabs,
  UnderlinedTabs,
  IconTabs,
  Pills,
  VerticalTabs
} from '../components/tabs'
import Widget from '../components/widget'
import {FiSettings, FiHeart, FiMenu} from 'react-icons/fi'

const Tab0 = () => (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Molestie ac feugiat sed
    lectus vestibulum mattis ullamcorper velit sed. Condimentum vitae sapien
    pellentesque habitant morbi. Nec ullamcorper sit amet risus nullam eget
    felis. Dignissim sodales ut eu sem integer vitae justo eget. In pellentesque
    massa placerat duis ultricies.
  </div>
)

const Tab1 = () => (
  <div>
    Id cursus metus aliquam eleifend mi in. Etiam sit amet nisl purus in. At
    quis risus sed vulputate odio ut enim blandit. Aliquet enim tortor at auctor
    urna nunc id cursus metus. Massa enim nec dui nunc. Penatibus et magnis dis
    parturient montes. Nisl nisi scelerisque eu ultrices vitae auctor eu augue.
    Enim ut tellus elementum sagittis vitae. Quisque sagittis purus sit amet.
    Augue lacus viverra vitae congue eu.
  </div>
)

const Tab2 = () => (
  <div>
    Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus.
    Sed nisi lacus sed viverra. Varius sit amet mattis vulputate enim nulla
    aliquet porttitor. Adipiscing elit pellentesque habitant morbi tristique
    senectus. Laoreet suspendisse interdum consectetur libero id. Tincidunt nunc
    pulvinar sapien et ligula.
  </div>
)

const pills = [
  {
    index: 0,
    content: <Tab0 />,
    title: (
      <>
        <FiHeart size={18} className="stroke-current" />
        <span className="mt-3">Favourites</span>
      </>
    )
  },
  {
    index: 1,
    title: (
      <>
        <FiMenu size={18} className="stroke-current" />
        <span className="mt-3">Options</span>
      </>
    ),
    content: <Tab1 />
  },
  {
    index: 2,
    title: (
      <>
        <FiSettings size={18} className="stroke-current" />
        <span className="mt-3">Settings</span>
      </>
    ),
    content: <Tab2 />
  }
]
const tabsWithIcons = [
  {
    index: 0,
    content: <Tab0 />,
    title: (
      <>
        <FiHeart size={18} className="stroke-current" />
        <span className="ml-2">Favourites</span>
      </>
    )
  },
  {
    index: 1,
    title: (
      <>
        <FiMenu size={18} className="stroke-current" />
        <span className="ml-2">Options</span>
      </>
    ),
    content: <Tab1 />
  },
  {
    index: 2,
    title: (
      <>
        <FiSettings size={18} className="stroke-current" />
        <span className="ml-2">Settings</span>
      </>
    ),
    content: <Tab2 />
  }
]

const tabs = [
  {index: 0, title: 'Profile', active: true, content: <Tab0 />},
  {index: 1, title: 'Settings', active: false, content: <Tab1 />},
  {index: 2, title: 'Options', active: false, content: <Tab2 />}
]

const Index = () => (
  <>
    <SectionTitle title="UI Elements" subtitle="Tabs" />

    <Widget
      title="Vertical tabs"
      description={
        <span>
          Use the <code>&lt;VerticalTabs /&gt;</code> component for vertical
          tabs
        </span>
      }>
      <div className="flex flex-wrap">
        <div className="w-full">
          <VerticalTabs tabs={pills} />
        </div>
      </div>
    </Widget>

    <Widget
      title="Pills"
      description={
        <span>
          Use the <code>&lt;Pills /&gt;</code> component for tabs with icons
          aligned vertically
        </span>
      }>
      <div className="flex flex-wrap">
        <div className="w-full">
          <Pills tabs={pills} />
        </div>
      </div>
    </Widget>

    <Widget
      title="Tabs with icons"
      description={
        <span>
          Use the <code>&lt;IconTabs /&gt;</code> component for tabs with icons
        </span>
      }>
      <div className="flex flex-wrap">
        <div className="w-full">
          <IconTabs tabs={tabsWithIcons} />
        </div>
      </div>
    </Widget>

    <Widget
      title="Underlined tabs"
      description={
        <span>
          Use the <code>&lt;UnderlinedTabs /&gt;</code> component for underlined
          tabs
        </span>
      }>
      <div className="flex flex-wrap">
        <div className="w-full">
          <UnderlinedTabs tabs={tabs} />
        </div>
      </div>
    </Widget>

    <Widget
      title="Default tabs"
      description={
        <span>
          Use the <code>&lt;DefaultTabs /&gt;</code> component for underlined
          tabs
        </span>
      }>
      <div className="flex flex-wrap">
        <div className="w-full">
          <DefaultTabs tabs={tabs} />
        </div>
      </div>
    </Widget>
  </>
)
export default Index
