import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {useHotkeys} from 'react-hotkeys-hook'

const Hotkeys = () => {
  const {config, palettes} = useSelector(
    state => ({
      config: state.config,
      palettes: state.palettes
    }),
    shallowEqual
  )
  let {layout, collapsed, rightSidebar} = {...config}
  let {background, leftSidebar, navbar} = {
    ...palettes
  }
  const dispatch = useDispatch()

  let layouts = [{name: 'layout-1'}]
  const colors = [{name: 'light'}, {name: 'dark'}]

  useHotkeys('shift+1', () => {
    let keys = layouts.map(i => i.name)
    let index = keys.findIndex(i => i === layout)
    let next = keys[index + 1] ? keys[index + 1] : keys[0]
    dispatch({
      type: 'SET_CONFIG_KEY',
      key: 'layout',
      value: next
    })
  })

  useHotkeys('shift+2', () => {
    dispatch({
      type: 'SET_CONFIG_KEY',
      key: 'collapsed',
      value: !collapsed
    })
  })

  useHotkeys('shift+3', () => {
    dispatch({
      type: 'SET_CONFIG_KEY',
      key: 'rightSidebar',
      value: !rightSidebar
    })
  })

  useHotkeys('shift+4', () => {
    let keys = colors.map(i => i.name)
    let index = keys.findIndex(i => i === background)
    let next = keys[index + 1] ? keys[index + 1] : keys[0]
    dispatch({
      type: 'SET_PALETTE',
      palette: {
        background: next
      }
    })
  })

  useHotkeys('shift+5', () => {
    let keys = colors.map(i => i.name)
    let index = keys.findIndex(i => i === leftSidebar)
    let next = keys[index + 1] ? keys[index + 1] : keys[0]
    dispatch({
      type: 'SET_PALETTE',
      palette: {
        leftSidebar: next
      }
    })
  })

  useHotkeys('shift+6', () => {
    let keys = colors.map(i => i.name)
    let index = keys.findIndex(i => i === navbar)
    let next = keys[index + 1] ? keys[index + 1] : keys[0]
    dispatch({
      type: 'SET_PALETTE',
      palette: {
        navbar: next
      }
    })
  })

  useHotkeys('shift+9', () => {
    dispatch({
      type: 'SET_CONFIG',
      config: {
        layout: 'layout-1',
        collapsed: false,
        rightSidebar: false,
        backdrop: false
      }
    })
    dispatch({
      type: 'RESET_PALETTES'
    })
  })

  return null
}

export default Hotkeys
