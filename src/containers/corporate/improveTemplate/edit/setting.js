import React, {useState, useEffect} from 'react'
import {
  Grid
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

import Widget from '../../../../components/widget'
import { useStyles } from '../../../style/common'
import Attribute from "../components/attribute";

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const Setting = (props) => {
  const {template, setInfo} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [name, setName] = useState('')
  const [attributes, setAttributes] = useState([])

  const validate = () => {
    let res = true
    if (name === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    let tmp = {}
    tmp.name = name
    tmp.attributes = attributes
    setInfo(tmp)
  }
  const handleChange = (value, index) => {
    if (attributes.length <= index)
      return
    let _attributes = [...attributes]
    let attribute = _attributes[index]
    _attributes[index] = {...attribute, ...value}
    setAttributes(_attributes)
  }

  useEffect(() => {
    setName(template?.name || '')
    let _attributes = template?.attributes?.items || []
    _attributes = _attributes.filter((attribute) => attribute.base && attribute.editable)
    setAttributes(_attributes)
  }, [template])
  return (
    <Widget
      title=""
      description={
        <span>
          Setting
        </span>
      }>
      <Grid container>
        <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {attributes.map((attribute, index) => (
                  (attribute.base && attribute.editable) ?
                  <Grid item md={4} sm={6} xs={12} key={index}>
                    <Attribute title={attribute.name} isCheck={false} initValue={attribute.value} disabled={!attribute?.editable} onChange={(v) => handleChange(v, index)} />
                  </Grid>:''
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ height: 150, paddingTop: 50 }}>
          <Link to={`/corporate/improveTemplate`} style={{textDecoration: 'none'}}>
            <button className={`${classes.button} ${customeClasses.cancel}`} >Cancel</button>
          </Link>
          <button className={classes.button} style={{float: 'right'}} onClick={handleSave}>Save</button>
        </Grid>
      </Grid>
    </Widget>
  )
}
export default Setting
