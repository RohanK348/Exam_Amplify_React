import React, {useState} from 'react'
import {
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'
import Datepicker from '../../../../components/datepicker'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const Schedule = (props) => {
  const {opening, setInfo, prevStep} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [date, setDate] = useState('')

  const handlePrev = () => {

    prevStep()
  }
  const validate = () => {
    let res = true
    if (date === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleContinue = () => {
    if (!validate())
      return
    setInfo({ExpiryDate: new Date(date)})
  }
  const handleChange = (e) => {
    setDate(e)
  }

  return (
    <Widget
      title=""
      description={
        <span>
          Schedule
        </span>
      }>
      <Grid container>
        <Grid item lg={6} md={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{fontWeight: 'bold'}}>
              Duration
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <Datepicker label="Expiry Date" value={date} onChange={handleChange}  />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{height: 150, paddingTop: 50}}>
          <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handlePrev}>Cancel</button>
          <button className={classes.button} style={{float: 'right'}} onClick={handleContinue}>Save <span>&#38;</span> Continue</button>
        </Grid>
      </Grid>
    </Widget>
  )
}
export default Schedule
