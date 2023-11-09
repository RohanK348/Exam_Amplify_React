import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  Button,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {RemoveRedEye} from '@material-ui/icons'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {getAnalisisStudents} from '../../../api/examResult'
import {get as getExam} from '../../../api/exam'
import {useAsync} from '../../../functions/utils'

const columns = [
  { id: 'name', label: 'Student Name', minWidth: 150, align: 'center' },
  { id: 'leftBrainPercentage', label: 'Left Brain Percentage', minWidth: 100, align: 'center' },
  { id: 'leftBrainCorrect', label: 'Left Brain Correct', minWidth: 100, align: 'center' },
  { id: 'rightBrainPercentage', label: 'Right Brain Percentage', minWidth: 100, align: 'center' },
  { id: 'rightBrainCorrect', label: 'Right Brain Correct', minWidth: 100, align: 'center' },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]

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

const Result = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {examId, index} = useParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [exam, setExam] = useState({})
  const [students, setStudents] = useState([])
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
  const loadMore = () => {
    run(getAnalisisStudents(examId, index, limit, from))
    setFrom(from+limit)
    setPending(true)
    setAsyncState('getAnalisisStudents')
  }

  useEffect(() => {
    run(getExam(examId))
    setAsyncState('getExam')
    setPending(true)
    
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getExam') {
        setExam(data)
        setStudents([])
        setFrom(limit)
        run(getAnalisisStudents(examId, index, limit, 0))
        setAsyncState('getAnalisisStudents')
      }
      else if (asyncState === 'getAnalisisStudents') {
        let tmp = data.map((item) => {
          item.name = `${item?.user?.firstName} ${item?.user?.lastName}`
          item.leftBrainPercentage = `${item?.result?.left?.percentage}%`
          item.leftBrainCorrect = `${item?.result?.left?.totalCorrect}/${item?.result?.left?.totalQuestion}`
          item.rightBrainPercentage = `${item?.result?.right?.percentage}%`
          item.rightBrainCorrect = `${item?.result?.right?.totalCorrect}/${item?.result?.right?.totalQuestion}`
          return item
        })
        setStudents([...students, ...tmp])
        setPending(false)
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
      <SectionTitle title="Exam Result" subtitle={`Exam Result(${exam?.name})`} />
      <Widget
        title="Exam Result"
        description={
          <span>
            Here are Result
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
              {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <>
                                <Link to={`/corporate/exam/result/detail/${examId}/${row?.user?.id}`} style={{textDecoration: 'none'}}>
                                  <IconButton aria-label="detail">
                                    <RemoveRedEye className={classes.icon} />
                                  </IconButton>
                                </Link>
                              </>
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
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Button style={{marginTop: 10}} variant="outlined" onClick={loadMore}>View More</Button>
      </Widget>
    </>
  )
}
export default Result
