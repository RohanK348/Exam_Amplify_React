import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid, 
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import SectionTitle from '../../../../../components/section-title'
import Widget from '../../../../../components/widget'
import {getStudent} from '../../../../../api/examResult'
import {useAsync} from '../../../../../functions/utils'
import AmplifyImage from '../../../../../components/amplifyImage'
import Analisis from './analisis'
import Screen from './screen'

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

const StudentDetail = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {examId, userId} = useParams()
  const [student, setStudent] = useState({})
  const [pending, setPending] = useState(false)

  useEffect(() => {
    run(getStudent(examId, userId))
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      console.log(data)
      if (data.length !== 0) {
        setStudent(data[0])
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
      <SectionTitle title="Student Detail" subtitle={`Student Detail( Exam: ${student?.exam?.name})`} />
      <Grid container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Widget
            title="Student Profile"
            description={
              <span>
                Here are Profile
              </span>
            }>
            <Grid container>
              <Grid item lg={4} xs={12}>
                <div className="flex justify-center items-center">
                  {student?.user?.avatar === '/images/default-avatar.jpg'?
                  <img className="rounded-full h-24 w-24 shadow-outline user-img" src="/images/default-avatar.jpg" alt="avatar" />:
                  <AmplifyImage className="rounded-full h-24 w-24 shadow-outline user-img" imageKey={student?.user?.avatar} alt="avatar" />
                  }
                </div>
              </Grid>
              <Grid item lg={8} xs={12}>
                <div className="text-sm p-2">Name: {`${student?.user?.firstName} ${student?.user?.lastName}`}</div>
                <div className="text-sm p-2">Address: {student?.user?.profile?.address}</div>
                <div className="text-sm p-2">Phone Number: {student?.user?.phone}</div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item md={8} sm={6} xs={12}>
          <Analisis result={student?.result} />
        </Grid>
        <Grid item xs={12}>
          {(student?.exam?.camera||student?.exam?.screen)&&
            <Screen examResult={student} />
          }
        </Grid>
      </Grid>
      
    </>
  )
}
export default StudentDetail
