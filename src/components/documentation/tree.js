import React from 'react'
import SectionTitle from '../section-title'
export const Tree = () => (
  <>
    <SectionTitle title="Folder tree" subtitle="All folders" />
    <div className="flex">
      <div className="w-full">
        <pre>{`.
├── build
│   ├── assets
│   │   └── faces
│   ├── icons
│   ├── images
│   │   └── products
│   ├── logos
│   ├── screenshots
│   └── static
│       ├── css
│       └── js
├── public
│   ├── assets
│   │   └── faces
│   ├── icons
│   ├── images
│   │   └── products
│   ├── logos
│   ├── pages
│   │   └── error-page
│   └── screenshots
├── scripts
└── src
    ├── components
    │   ├── alerts
    │   ├── backdrop
    │   ├── badges
    │   ├── breadcrumbs
    │   ├── buttons
    │   ├── charts
    │   ├── circle
    │   ├── color-picker
    │   ├── coming-soon
    │   ├── dashboard
    │   ├── datatable
    │   ├── datepicker
    │   ├── documentation
    │   ├── drag-and-drop
    │   ├── dropdowns
    │   ├── dropzone
    │   ├── flag
    │   ├── forms
    │   ├── hotkeys
    │   ├── inbox
    │   ├── kanban
    │   ├── landing
    │   ├── left-sidebar-1
    │   ├── lists
    │   ├── loader
    │   ├── login-2
    │   ├── login-3
    │   ├── maps
    │   ├── modals
    │   ├── navbar-1
    │   ├── notifications
    │   ├── pagination
    │   ├── popovers
    │   ├── profile
    │   ├── progress-bars
    │   ├── recharts
    │   ├── right-sidebar-1
    │   ├── sample-forms
    │   ├── section-title
    │   ├── sliders
    │   ├── social-feed
    │   ├── star-rating
    │   ├── steps
    │   ├── switch
    │   ├── tabs
    │   ├── tasks
    │   ├── text-editor
    │   ├── timelines
    │   ├── todo
    │   ├── tooltips
    │   ├── top-navigation-2
    │   ├── user-widgets
    │   ├── widget
    │   └── widgets
    ├── css
    │   ├── components
    │   ├── layouts
    │   └── palettes
    ├── functions
    ├── json
    ├── layouts
    │   ├── centered
    │   ├── centered-form
    │   ├── empty
    │   └── layout-1
    ├── pages
    └── reducers`}</pre>
      </div>
    </div>
  </>
)
