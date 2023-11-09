import React from 'react'
import 'react-notifications/lib/notifications.css'
import {NotificationContainer} from 'react-notifications'

import Routes from './router/index'
import './css/tailwind.css'
import './css/main.css'
import './css/animate.css'
import './css/_components.css'
import {SettingProvider} from './provider/setting'

const App = () => {
  return (
    <>
      <NotificationContainer />
      <SettingProvider>
        <Routes />
      </SettingProvider>
    </>
  )
}
export default App
