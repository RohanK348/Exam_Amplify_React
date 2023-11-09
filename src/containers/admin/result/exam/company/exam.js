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

import SectionTitle from '../../../../../components/section-title'
import Widget from '../../../../../components/widget'
import {getByPagination as getExams} from '../../../../../api/exam'
import {useAsync} from '../../../../../functions/utils'
import { formatYmd } from '../../../../../functions/string'

const columns = [
  { id: 'name', label: 'Name', minWidth: 150, align: 'center' },
  { id: 'duration', label: 'Duration', minWidth: 100, align: 'center' },
  { id: 'startTime', label: 'Start', minWidth: 100, align: 'center' },
  { id: 'endTime', label: 'End', minWidth: 100, align: 'center' },
  { id: 'questions', label: 'Questions', minWidth: 100, align: 'center' },
  {
    id: 'action',
    label: '',
    minWidth: 100,
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

const Company = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {id} = useParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [exams, setExams] = useState([])
  const [pending, setPending] = useState(false)
  const limit = 10

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const loadMore = () => {
    run(getExams({openingID: {eq: id}, isTrain: {eq: false}, type: {ne: 'PRIVATE'}}, limit, from))
    setFrom(from+limit)
    setPending(true)
  }

  useEffect(() => {
    setExams([])
    setFrom(limit)
    run(getExams({openingID: {eq: id}, isTrain: {eq: false}, or: [{type: {ne: 'PRIVATE'}}, {type: {eq: 'PRIVATE'}}]}, limit, 0))
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      let tmp = data.map((item) => {
        item.duration = `${Math.ceil(item.totalTime/60)} min`
        item.rightDuration = `${Math.ceil(item.rightBrainTime/60)} min`
        item.leftDuration = `${Math.ceil(item.leftBrainTime/60)} min`
        item.questions = item?.right?.length + item?.left?.length
        if (item.type === 'SCHEDULED' || item.type === 'PRE_DEFINED')
          item.startTime = formatYmd(new Date(item.startDate))
        if (item.type === 'SCHEDULED')
          item.endTime = formatYmd(new Date(item.endDate))
        return item
      })
      console.log(tmp)
      setExams([...exams, ...tmp])
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
      <SectionTitle title="Company Exam" subtitle="Company Exam management" />
      <Widget
        title="Company Exam"
        description={
          <span>
            Here are exams
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
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: 10}}>
                          {column.id === 'action'?
                            (
                              <>
                                <Link to={`/admin/exam/detail/${row.id}`} style={{textDecoration: 'none'}}>
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
          count={exams.length}
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
export default Company
