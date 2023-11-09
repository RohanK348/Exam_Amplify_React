import React, {useEffect, useState} from 'react'
import {
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
  const {exam, template, setInfo, prevStep} = props
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [totalTime, setTotalTime] = useState(0)
  const [leftBrainTime, setLeftBrainTime] = useState(0)
  const [rightBrainTime, setRightBrainTime] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isRandom, setIsRandom] = useState(false)
  const [possibleRandom, setPossibleRandom] = useState(false)

  const handlePrev = () => {

    prevStep()
  }
  const handleContinue = () => {
    let tmp = {}
    tmp.totalTime = totalTime
    tmp.rightBrainTime = rightBrainTime
    tmp.leftBrainTime = leftBrainTime
    tmp.startDate = new Date(startDate)
    tmp.endDate = new Date(endDate)
    tmp.isRandom = isRandom
    setInfo(tmp)
  }

  useEffect(() => {
    if (template) {
      if (template.isSimple) {
        setTotalTime(template?.right?.totalTime + template?.left?.totalTime)
        setRightBrainTime(template?.right?.totalTime)
        setLeftBrainTime(template?.left?.totalTime)
        if (template?.right?.isOwn||template?.left?.isOwn) {
          setPossibleRandom(false)
        }
        else
          setPossibleRandom(true)
      }
      else {
        setTotalTime(template.totalTime)
        const rightTime = Math.ceil(template.totalTime/2)
        setRightBrainTime(rightTime)
        setLeftBrainTime(template.totalTime - rightTime)
        setPossibleRandom(true)
      }
    }
  }, [template])
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
              Exam Method & Type
            </Grid>
            <Grid item xs={12}>
              Method: {exam?.method}, Type: {exam?.type}
            </Grid>
            <Grid item xs={12} style={{fontWeight: 'bold'}}>
              Start & Expiry Date
            </Grid>
            {(exam?.type === 'SCHEDULED' || exam?.type === 'PRE_DEFINED') &&
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <Datepicker label="From" value={startDate} onChange={(e) => setStartDate(e)}  />
              </div>
            </Grid>
            }
            {exam?.type === 'SCHEDULED' &&
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <Datepicker label="To" value={endDate} onChange={(e) => setEndDate(e)}  />
              </div>
            </Grid>
            }
            <Grid item xs={12} style={{fontWeight: 'bold'}}>
              Time
            </Grid>
            <Grid item md={6} xs={12}>
              <div className="form-element">
                <div className="form-label">Total Time</div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Total Time"
                  value={totalTime}
                  onChange={(e) => setTotalTime(e.target.value)}
                />
              </div>
            </Grid>
            {exam?.method !== 'MIX' && 
            <>
              <Grid item md={6} xs={12}>
                <div className="form-element">
                  <div className="form-label">Right Brain Time</div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Right Brain Time"
                    value={rightBrainTime}
                    onChange={(e) => setRightBrainTime(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="form-element">
                  <div className="form-label">Left Brain Time</div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Left Brain Time"
                    value={leftBrainTime}
                    onChange={(e) => setLeftBrainTime(e.target.value)}
                  />
                </div>
              </Grid>
            </>
            }
            <Grid item xs={12}>
              <div className="form-element pt-8">
                <div className="flex items-center justify-start space-x-2">
                  <label className="flex items-center justify-start space-x-2">
                    <input
                      type="checkbox"
                      className={`form-checkbox h-4 w-4`}
                      checked={isRandom}
                      disabled={!possibleRandom}
                      onChange={(e) => setIsRandom(e.target.checked)}
                    />
                    <span>Random</span>
                  </label>
                </div>
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
