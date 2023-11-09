import React, {useState, useEffect} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {useAsync} from '../../../functions/utils'
import {
  getAll as getSetting, 
  create as createSetting, 
  update as updateSetting
} from '../../../api/settingPrice'
import { useStyles } from '../../style/common'
const Setting = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [corporateDes, setCorporateDes] = useState('')
  const [candidateDes, setCandidateDes] = useState('')
  const [id, setId] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [pending, setPending] = useState(false)

  const handleSave = () => {
    if (isNew) {
      createSetting({
        corporateDescription: corporateDes,
        candidateDescription: candidateDes,
      })
    }
    else {
      updateSetting({
        id: id,
        corporateDescription: corporateDes,
        candidateDescription: candidateDes,
      })
    }
  }

  useEffect(() => {
    run(getSetting())
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (data.length === 0)
        setIsNew(true)
      else {
        setIsNew(false)
        setCorporateDes(data[0].corporateDescription)
        setCandidateDes(data[0].candidateDescription)
        setId(data[0].ID)
      }
      setPending(false)
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
    <>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <SectionTitle title="Setting" subtitle="Price Setting" />
      <Widget
        title=""
        description={
          <span>
            Setting
          </span>
        }>
        <Grid container>
          <Grid item lg={6} md={8} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="form-element">
                  <div className="form-label">Corporate Description</div>
                  <textarea
                    className="form-textarea"
                    rows="3"
                    value={corporateDes}
                    onChange={(e) => setCorporateDes(e.target.value)}
                    placeholder="Corporate Description">
                  </textarea>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="form-element">
                  <div className="form-label">Candidate Description</div>
                  <textarea
                    className="form-textarea"
                    rows="3"
                    value={candidateDes}
                    onChange={(e) => setCandidateDes(e.target.value)}
                    placeholder="Candidate Description">
                  </textarea>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{height: 150, paddingTop: 50}}>
            <button className={classes.button} style={{float: 'right'}} onClick={handleSave}>Save</button>
          </Grid>
        </Grid>
      </Widget>
    </>
  )
}
export default Setting
