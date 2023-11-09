import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
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
import {getByPagination as getExamResults} from '../../../api/examResult'
import {useAsync} from '../../../functions/utils'
import {useSetting} from '../../../provider/setting'

const columns = [
  { id: 'companyName', label: 'Company Name', minWidth: 150, align: 'center' },
  { id: 'openingName', label: 'Opening Name', minWidth: 150, align: 'center' },
  { id: 'examName', label: 'Exam Name', minWidth: 150, align: 'center' },
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
  const [setting] = useSetting()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [examResults, setExamResults] = useState([])
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
    run(getExamResults({userID: {eq: setting?.auth?.id}, corporateID: {ne: ''}, isTrain: {eq: false}}, limit, from))
    setFrom(from+limit)
    setPending(true)
  }

  useEffect(() => {
    if (setting?.auth) {
      setExamResults([])
      setFrom(limit)
      run(getExamResults({userID: {eq: setting?.auth?.id}, corporateID: {ne: ''}, isTrain: {eq: false}}, limit, 0))
      setPending(true)
    }
  }, [run, setting?.auth])
  useEffect(() => {
    if (status === 'resolved') {
      console.log(data)
      let tmp = data.map((item) => {
        item.examName = item?.exam?.name
        item.openingName = item?.exam?.opening?.title
        item.companyName = item?.exam?.opening?.corporate?.companyName
        item.name = `${item?.user?.firstName} ${item?.user?.lastName}`
        let percentage = item?.result?.left?.percentage
        item.leftBrainPercentage = `${percentage?percentage.toFixed(1):0}%`
        item.leftBrainCorrect = `${item?.result?.left?.totalCorrect}/${item?.result?.left?.totalQuestion}`
        percentage = item?.result?.right?.percentage
        item.rightBrainPercentage = `${percentage?percentage.toFixed(1):0}%`
        item.rightBrainCorrect = `${item?.result?.right?.totalCorrect}/${item?.result?.right?.totalQuestion}`
        return item
      })
      setExamResults([...examResults, ...tmp])
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
      <SectionTitle title="Exam Result" subtitle="Exam Result Manage" />
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
              {examResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <>
                                <Link to={`/result/detail/${row.examID}`} style={{textDecoration: 'none'}}>
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
          count={examResults.length}
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
