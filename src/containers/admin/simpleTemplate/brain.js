import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {useStyles} from '../../style/common'
import { useAsync } from '../../../functions/utils'
import {get, update} from '../../../api/simpleBrainTemplate'
import Question from './question/index'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))
const BrainTemplate = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  const history = useHistory()
  const classes = useStyles()
  const customeClasses = useCustomStyles()
  const [totalTime, setTotalTime] = useState(0)
  const [isOwn, setIsOwn] = useState(false)
  const [brain, setBrain] = useState('')
  const [brainTemplate, setBrainTemplate] = useState({})
  const [sections, setSections] = useState([])
  const [beginner, setBeginner] = useState(0)
  const [intermediate, setIntermediate] = useState(0)
  const [advanced, setAdvanced] = useState(0)
  const [high, setHigh] = useState(0)
  const [veryHigh, setVeryHigh] = useState(0)
  const [complex, setComplex] = useState(0)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const handleSave = () => {
    let tmp = {}
    tmp.id = id
    tmp.isOwn = isOwn
    tmp.totalTime = totalTime
    if (!isOwn) {
      tmp.beginner = beginner
      tmp.advanced = advanced
      tmp.intermediate = intermediate
      tmp.high = high
      tmp.veryHigh = veryHigh
      tmp.complex = complex
    }
    run(update(tmp))
    setPending(true)
    setAsyncState('save')
  }

  useEffect(() => {
    run(get(id))
    setPending(false)
    setAsyncState('get')
  }, [id])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'get') {
        if (data?.brain === 'right')
          setBrain('Right')
        else if (data?.brain === 'left')
          setBrain('Left')
        setTotalTime(data?.totalTime)
        setIsOwn(data?.isOwn)
        setBeginner(data?.beginner||0)
        setIntermediate(data?.intermediate||0)
        setAdvanced(data?.advanced||0)
        setHigh(data?.high||0)
        setVeryHigh(data?.veryHigh||0)
        setComplex(data?.complex||0)
        setBrainTemplate(data)
      }
      else if (asyncState === 'save') {
        history.push(`${process.env.PUBLIC_URL}/admin/simpleTemplate`)
      }
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
      <SectionTitle 
        title={`${brain} Brain Template`} 
        subtitle={`${brain} Brain Template`} 
        right={
          <div>
            <Link to={`${process.env.PUBLIC_URL}/admin/simpleTemplate`} style={{textDecoration: 'none'}}>
              <button className={`${classes.button} ${customeClasses.cancel}`}>Cancel</button>
            </Link>
            <button className={classes.button} onClick={handleSave}>Save</button>
          </div>
        }
      />
      <Widget
        title=""
        description={
          <span>
            {brain} Brain
          </span>
        }>
        <Grid container>
          <Grid item lg={6} md={8} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <div className="form-element">
                      <div className="form-label">Brain Time (in seconds)</div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Brain Time"
                        value={totalTime}
                        onChange={(e) => setTotalTime(e.target.value)}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div className="form-element pt-8">
                  <div className="flex items-center justify-start space-x-2">
                    <label className="flex items-center justify-start space-x-2">
                      <input
                        type="checkbox"
                        className={`form-checkbox h-4 w-4`}
                        checked={isOwn}
                        onChange={(e) => setIsOwn(e.target.checked)}
                      />
                      <span>Own Question</span>
                    </label>
                  </div>
                </div>
              </Grid>
              {!isOwn &&
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <div className="form-element">
                      <div className="form-label">The Number of Beginner Questions</div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Beginner"
                        value={beginner}
                        onChange={(e) => setBeginner(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <div className="form-element">
                      <div className="form-label">The Number of Intermediate Questions</div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Intermediate"
                        value={intermediate}
                        onChange={(e) => setIntermediate(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <div className="form-element">
                      <div className="form-label">The Number of Advanced Questions</div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Advanced"
                        value={advanced}
                        onChange={(e) => setAdvanced(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <div className="form-element">
                      <div className="form-label">The Number of High Questions</div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="High"
                        value={high}
                        onChange={(e) => setHigh(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <div className="form-element">
                      <div className="form-label">The Number of VeryHigh Questions</div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="VeryHigh"
                        value={veryHigh}
                        onChange={(e) => setVeryHigh(e.target.value)}
                      />
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <div className="form-element">
                      <div className="form-label">The Number of Complex Questions</div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Complex"
                        value={complex}
                        onChange={(e) => setComplex(e.target.value)}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              }
            </Grid>
          </Grid>
          {isOwn &&
          <Grid item xs={12}>
            <Question brainTemplate={brainTemplate} />
          </Grid>
          }
        </Grid>
      </Widget>
    </>
  )
}
export default BrainTemplate
