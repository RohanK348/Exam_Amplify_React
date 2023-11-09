import React, {useState, useEffect} from 'react'
import {
  Grid
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const BasicDetail = (props) => {
  const {exam, types, methods, setInfo, nextStep} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [name, setName] = useState('')
  const [displayType, setDisplayType] = useState('SEQUENTIAL')
  const [displayTypes, setDisplayTypes] = useState(['SEQUENTIAL', 'BACK_ENABLED'])
  const [method, setMethod] = useState('')
  const [type, setType] = useState('')
  const [isCamera, setIsCamera] = useState(false)
  const [camera, setCamera] = useState(0)
  const [isScreen, setIsScreen] = useState(false)
  const [screen, setScreen] = useState(0)

  const validate = () => {
    let res = true
    if (name === '')
      res = false
    if (isCamera && camera === 0)
      res = false
    if (isScreen && screen === 0)
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleContinue = () => {
    if (!validate())
      return
    let tmp = {}
    tmp.name = name
    tmp.displayType = displayType
    tmp.method = method
    tmp.type = type
    tmp.isCamera = isCamera
    tmp.camera = camera
    tmp.isScreen = isScreen
    tmp.screen = screen
    setInfo(tmp)
    nextStep()
  }

  useEffect(() => {
    setName(exam?.name||'')
    setDisplayType(exam?.displayType||'SEQUENTIAL')
    if (exam?.method)
      setMethod(exam?.method||'')
    else {
      if (methods.length !== 0 && method === '')
        setMethod(methods[0].name)
    }
    if (exam?.type)
      setType(exam?.type||'OPEN')
    else {
      if (types.length !== 0 && type === '')
        setType(types[0].name)
    }
    setIsCamera(exam?.camera||false)
    setCamera(exam?.cameraNumber||0)
    setIsScreen(exam?.screen||false)
    setScreen(exam?.screenNumber||0)
  }, [exam, methods, types])
  return (
    <Widget
      title=""
      description={
        <span>
          Basic Details
        </span>
      }>
      <Grid container>
        <Grid item lg={6} md={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <div className="form-element">
                    <div className="form-label">Name</div>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="form-element">
                    <div className="form-label">Display Type</div>
                    <select
                      className={`form-select`}
                      value={displayType}
                      onChange={(e) => setDisplayType(e.target.value)}
                    >
                      {displayTypes.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Method</div>
                <select
                  className={`form-select`}
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  {methods.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Type</div>
                <select
                  className={`form-select`}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {types.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>
            <Grid item md={2} xs={4}>
              <div className="form-element pt-8">
                <div className="flex items-center justify-start space-x-2">
                  <label className="flex items-center justify-start space-x-2">
                    <input
                      type="checkbox"
                      className={`form-checkbox h-4 w-4`}
                      checked={isCamera}
                      onChange={(e) => setIsCamera(e.target.checked)}
                    />
                    <span>Camera</span>
                  </label>
                </div>
              </div>
            </Grid>
            <Grid item md={4} xs={8}>
              <div className="form-element">
                <div className="form-label">Camera Number</div>
                <input
                  disabled={!isCamera}
                  type="text"
                  className="form-input"
                  placeholder="Camera Number"
                  value={camera}
                  onChange={(e) => setCamera(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item md={2} xs={4}>
              <div className="form-element pt-8">
                <div className="flex items-center justify-start space-x-2">
                  <label className="flex items-center justify-start space-x-2">
                    <input
                      type="checkbox"
                      className={`form-checkbox h-4 w-4`}
                      checked={isScreen}
                      onChange={(e) => setIsScreen(e.target.checked)}
                    />
                    <span>Screen</span>
                  </label>
                </div>
              </div>
            </Grid>
            <Grid item md={4} xs={8}>
              <div className="form-element">
                <div className="form-label">Screen Number</div>
                <input
                  disabled={!isScreen}
                  type="text"
                  className="form-input"
                  placeholder="Screen Number"
                  value={screen}
                  onChange={(e) => setScreen(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{height: 150, paddingTop: 50}}>
          <Link to="/corporate" style={{textDecoration: 'none'}}>
            <button className={`${classes.button} ${customeClasses.cancel}`} >Cancel</button>
          </Link>
          <button className={classes.button} style={{float: 'right'}} onClick={handleContinue}>Save <span>&#38;</span> Continue</button>
        </Grid>
      </Grid>
    </Widget>
  )
}
export default BasicDetail
