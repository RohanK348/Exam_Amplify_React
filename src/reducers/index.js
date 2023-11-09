import {combineReducers} from 'redux'
import config from './config'
import leftSidebar from './left-sidebar'
import palettes from './palettes'
import navigation from './navigation'

const rootReducer = combineReducers({
  navigation,
  config,
  leftSidebar,
  palettes
})

export default rootReducer
