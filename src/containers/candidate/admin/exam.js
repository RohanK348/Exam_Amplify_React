import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {PlayCircleFilledWhite, Star, AccessTime} from '@material-ui/icons'
import {NotificationManager} from 'react-notifications'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {getWithoutComplete as getExams} from '../../../api/exam'
import {getFilter as getFavorites, add as addFavorite, remove as removeFavorite} from '../../../api/favoriteExam'
import {getFilter as getExamResult} from '../../../api/examResult'
import {useAsync} from '../../../functions/utils'
import {sleep} from '../../../functions/common'
import {useSetting} from '../../../provider/setting'
import {useStyles} from '../../style/common'
import { formatYmd } from '../../../functions/string'
// import {isEmptyObject} from '../../../functions/common'

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  description: {
    lineHeight: '30px',
  },
  section: {
    backgroundColor: '#EEF5FE',
    width: 350,
    padding: 15,
    borderRadius: 5,
    marginBottom: 5,
  }
}))
const ActionStart = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {item} = props
  const [setting] = useSetting()
  const history = useHistory()
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [modalActive, setModalActive] = useState(false)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const handleClose = () => {
    setModalActive(false)
  }
  const handleLearnMore = () => {
    setModalActive(false)
    history.push(`/exam/${item.id}`)
  }
  // const handleAccept = () => {
  //   setModalActive(false)
  //   if (isEmptyObject(examResult)) {
  //     run(createExamResult({
  //       userID: setting.auth.id,
  //       examID: item.id,
  //       questionIndex: 1,
  //       backNumber: 4,
  //       isTrain: item.isTrain,
  //     }))
  //     setAsyncState('createExamResult')
  //     setPending(true)
  //   }
  //   else
  //     history.push(`/exam/${item.id}`)
  // }
  const handleStart = () => {
    let res = true
    const serverTime = new Date(setting.serverTime)
    const startTime = new Date(item.startDate)
    let endTime = new Date(item.endDate)
    if (item.type === 'SCHEDULED') {
      if (serverTime < startTime || serverTime > endTime) {
        res = false
        NotificationManager.warning('Please try between start time and end time', 'Worning', 3000);
      }
    }
    else if (item.type === 'PRE_DEFINED') {
      endTime = new Date(startTime.getTime() + item.totalTime)
      if (serverTime < startTime || serverTime > endTime) {
        res = false
        NotificationManager.warning('Please try between start time and end time', 'Worning', 3000);
      }
    }
    if (res)
      setModalActive(true)
  }

  useEffect(() => {
    if (item && setting.auth) {
      run(getExamResult({examID: {eq: item.id}, userID: {eq: setting.auth.id}}))
      setAsyncState('getExamResult')
    }
  }, [item, setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getExamResult') {
        setAsyncState('')
        setPending(false)
      }
      else if (asyncState === 'createExamResult') {
        sleep(3000)
        setPending(false)
        setAsyncState('')
        history.push(`/exam/${item.id}`)
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
      <IconButton aria-label="action" onClick={handleStart}>
        <PlayCircleFilledWhite className={classes.icon} />
      </IconButton>
      <Dialog
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title" style={{paddingTop: 30}}>{item.name}</DialogTitle>
        <DialogContent>
          <div className={customeClasses.title}>Before you begin</div>
          <div className={customeClasses.description}>
            Each quiz must be completed in one session; make sure you have a stable internet connection & you’re finished before exiting.
            The test is in English. If you don’t pass, your results won’t be displayed or shared.
          </div>
          {item.method !== 'MIX'?
          <>
            <div className={customeClasses.section}>
              <div style={{fontWeight: 'bold', paddingBottom: 10}}>Section 1</div>
              <div><AccessTime style={{marginRight: 10}} />Duration: {item.rightDuration}</div>
            </div>
            <div className={customeClasses.section}>
              <div style={{fontWeight: 'bold', paddingBottom: 10}}>Section 2</div>
              <div><AccessTime style={{marginRight: 10}} />Duration: {item.leftDuration}</div>
            </div>
          </>:
          <div className={customeClasses.section}>
            <div style={{fontWeight: 'bold', paddingBottom: 10}}>Section 1</div>
            <div><AccessTime style={{marginRight: 10}} />Duration: {item.duration}</div>
          </div>
          }
        </DialogContent>
        <DialogActions>
          <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handleLearnMore} color="primary">
            Learn More
          </button>
          {/* <button className={classes.button} onClick={handleAccept} color="primary">
            Accept & Processed
          </button> */}
        </DialogActions>
      </Dialog>
    </>
  )
}
const columns = [
  { id: 'name', label: 'Name', minWidth: 150, align: 'center' },
  { id: 'duration', label: 'Duration', minWidth: 100, align: 'center' },
  { id: 'startTime', label: 'Start', minWidth: 100, align: 'center' },
  { id: 'endTime', label: 'End', minWidth: 100, align: 'center' },
  { id: 'questions', label: 'Questions', minWidth: 100, align: 'center' },
  { id: 'favorite', label: 'Favorite', minWidth: 100, align: 'center' },
  {
    id: 'action',
    label: '',
    minWidth: 100,
    align: 'center',
  },
]

const Exam = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [exams, setExams] = useState([])
  const [favorites, setFavorites] = useState([])
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')
  const limit = 10

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleActivate = (openingId, activate) => {
    if (activate) {
      run(addFavorite(setting.auth.id, openingId))
      setAsyncState('addFavorite')
    }
    else {
      run(removeFavorite(setting.auth.id, openingId))
      setAsyncState('removeFavorite')
    }
  }
  const loadMore = () => {
    run(getExams({openingID: {eq: ''}, activate: {eq: true}, isTrain: {eq: false}, type: {ne: 'PRIVATE'}}, limit, from, setting?.auth?.id))
    setFrom(from+limit)
    setPending(true)
    setAsyncState('getExams')
  }

  useEffect(() => {
    if (setting.auth) {
      setExams([])
      setFrom(limit)
      run(getExams({openingID: {eq: ''}, activate: {eq: true}, isTrain: {eq: false}, or: [{type: {ne: 'PRIVATE'}}, {type: {eq: 'PRIVATE'}, students: {eq: setting?.auth?.id}}]}, limit, 0, setting?.auth?.id))
      setPending(true)
      setAsyncState('getExams')
    }
  }, [run, setting.auth, limit])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getExams') {
        let tmp = data.filter((item) => item.totalTime>0)
        tmp = tmp.map((item) => {
          item.duration = `${Math.ceil(item.totalTime/60)} min`
          item.rightDuration = `${Math.ceil(item.rightBrainTime/60)} min`
          item.leftDuration = `${Math.ceil(item.leftBrainTime/60)} min`
          item.questions = item?.right?.length||0 + item?.left?.length||0
          if (item.type === 'SCHEDULED' || item.type === 'PRE_DEFINED')
            item.startTime = formatYmd(new Date(item.startDate))
          if (item.type === 'SCHEDULED')
            item.endTime = formatYmd(new Date(item.endDate))
          return item
        })
        console.log(tmp)
        setExams([...exams, ...tmp])
        run(getFavorites({userID: {eq: setting.auth.id}}))
        setAsyncState('getFavorites')
      }
      else if (asyncState === 'getFavorites') {
        let tmp = data.map((item) => item.examID)
        setFavorites(tmp)
        setPending(false)
        setAsyncState('')
      }
      else if (asyncState === 'addFavorite') {
        setFavorites([...favorites, data])
      }
      else if (asyncState === 'removeFavorite') {
        var index = favorites.indexOf(data)
        let tmp = [...favorites.slice(0, index), ...favorites.slice(index + 1)]
        setFavorites(tmp)
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
      <SectionTitle title="Empowerr" subtitle="Empowerr Exams" />
      <Widget
        title=""
        description={
          <span>
            EXAMS FROM EMPOWERR
          </span>
        }>
        <TableContainer className={classes.container} style={{fontSize: 15}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontSize: 15 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <ActionStart item={row} />
                            ):
                          column.id === 'favorite'?
                            (favorites.indexOf(row.id) > -1 ?
                              (
                                <IconButton aria-label="detail" onClick={(e) => handleActivate(row.id, false)}>
                                  <Star color={'primary'} />
                                </IconButton>
                              ):
                              (
                                <IconButton aria-label="detail" onClick={(e) => handleActivate(row.id, true)}>
                                  <Star />
                                </IconButton>
                              )
                            ):
                            value
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={exams.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button style={{marginTop: 10}} variant="outlined" onClick={loadMore}>View More</Button>
        </div>
      </Widget>
    </>
  )
}
export default Exam
