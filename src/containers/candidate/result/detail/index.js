import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid, 
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import SectionTitle from '../../../../components/section-title'
import {getStudent} from '../../../../api/examResult'
import {useAsync} from '../../../../functions/utils'
import {useSetting} from '../../../../provider/setting'
import Analisis from './analisis'
import Print from './pdf/index'
import ImproveDetail from './improveDetail'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  button: {
    textTransform: 'none',
  },
  icon: {
    fontSize: 18,
  },
  refresh: {
    float: 'right',
    marginRight: 30,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const ResultDetail = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [setting] = useSetting()
  const {id} = useParams()
  const [examResult, setExamResult] = useState({})
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (setting?.auth) {
      run(getStudent(id, setting?.auth?.id))
      setPending(true)
    }
  }, [run, setting?.auth])
  useEffect(() => {
    if (status === 'resolved') {
      console.log("exam result", data)
      if (data.length !== 0) {
        setExamResult(data[0])
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
      <SectionTitle 
        title="Result Detail" 
        subtitle={`Result Detail( Exam: ${examResult?.exam?.name})`}
        right={<Print student={examResult} />} 
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Analisis result={examResult?.result} />
        </Grid>
        {examResult?.exam?.templateType === 'improve' && 
          <Grid item xs={12}>
            <ImproveDetail template={examResult?.exam?.improveTemplate} />
          </Grid>
        }
      </Grid>
    </>
  )
}
export default ResultDetail
