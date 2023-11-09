import React from 'react'
import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

const Index = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  useEffect(() => {
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
      type: 'SET_PALETTE',
      palette: {
        background: 'light',
        leftSidebar: 'light',
        navbar: 'light'
      }
    })
    window.scrollTo(0, 0)
    history.push('/')
  }, [dispatch, history])
  return <div />
}
export default Index
