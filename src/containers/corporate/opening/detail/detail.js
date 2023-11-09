import React, {useState, useEffect} from 'react'
import {
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {Edit} from '@material-ui/icons'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import {useAsync} from '../../../../functions/utils'
import {get} from '../../../../api/opening'
import {formatYmd} from '../../../../functions/string'

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    borderBottom: 'solid 1px #d8d4d4',
    padding: '5px 0px',
  },
  description: {
    borderBottom: 'solid 1px #d8d4d4',
    padding: '5px 0px',
  },
}))
const Detail = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = props
  const classes = useStyles()
  const [opening, setOpening] = useState({})
  const [pending, setPending] = useState(false)

  useEffect(() => {
    run(get(id))
    setPending(true)
  }, [run, id])
  useEffect(() => {
    if (status === 'resolved') {
      let tmp = data
      tmp.createdOn = formatYmd(new Date(tmp.createdAt))
      tmp.Expiry = formatYmd(new Date(tmp.ExpiryDate))
      tmp._vacancy = tmp.vacancy.slice(0, 2).join(', ')
      if (tmp.vacancy.length > 2)
        tmp._vacancy = tmp._vacancy + '...'
      tmp._years = tmp.years.slice(0, 2).join(', ')
      if (tmp.years.length > 2)
        tmp._years = tmp._years + '...'
      tmp._EAScore = tmp.EAScore.slice(0, 2).join(', ')
      if (tmp.EAScore.length > 2)
        tmp._EAScore = tmp._EAScore + '...'
      if (tmp.exam && tmp?.exam?.length !== 0)
        tmp._exam = "Yes"
      else
        tmp._exam = "No"
      setOpening(tmp)
      setPending(false)
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
    <Grid container>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Grid item xs={12}>
        <Link to={`/corporate/opening/edit/${id}`} style={{textDecoration: 'none'}}>
          <div style={{float: 'right', paddingRight: 30}}><Edit /> Edit</div>
        </Link>
      </Grid>
      <Grid item md={3} xs={6} className={classes.title}>
        Created On
      </Grid>
      <Grid item md={3} xs={6} className={classes.description}>
        {opening?.createdOn}
      </Grid>
      <Grid item md={3} xs={6} className={classes.title}>
        Expiry Date
      </Grid>
      <Grid item md={3} xs={6} className={classes.description}>
        {opening?.Expiry}
      </Grid>
      <Grid item md={3} xs={6} className={classes.title}>
        Number of Vancancy
      </Grid>
      <Grid item md={3} xs={6} className={classes.description}>
        {opening?._vacancy}
      </Grid>
      <Grid item md={3} xs={6} className={classes.title}>
        Experience
      </Grid>
      <Grid item md={3} xs={6} className={classes.description}>
        {opening?._years}
      </Grid>
      <Grid item md={3} xs={6} className={classes.title}>
        Empowerr Score
      </Grid>
      <Grid item md={3} xs={6} className={classes.description}>
        {opening?._EAScore}
      </Grid>
      <Grid item md={3} xs={6} className={classes.title}>
        Exam
      </Grid>
      <Grid item md={3} xs={6} className={classes.description}>
        {opening?._exam}
      </Grid>
      <Grid item xs={12}>
        <div style={{paddingTop: 40, paddingBottom: 20, fontWeight: 'bold'}}>Job Description</div>
        {opening?.description&&
        <SunEditor
          defaultValue={opening?.description}
          disable={true}
          hideToolbar
          setDefaultStyle="height: auto"
        />
        }
      </Grid>
    </Grid>
  )
}
export default Detail