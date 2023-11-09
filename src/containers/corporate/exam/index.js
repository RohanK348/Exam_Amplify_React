import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { NotificationManager } from 'react-notifications'
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  Box,
  List,
  ListItem,
  ListItemText,
  Popover,
  Button,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {Menu, Favorite} from '@material-ui/icons'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import {getByPagination as getExams, update as updateExam} from '../../../api/exam'
import {get as getAuth} from '../../../api/user'
import {useAsync} from '../../../functions/utils'
import {sleep} from '../../../functions/common'
import {useSetting} from '../../../provider/setting'
import Delete from './delete'

const columns = [
  { id: 'name', label: 'Name', minWidth: 150, align: 'center' },
  { id: 'duration', label: 'Duration', minWidth: 100, align: 'center' },
  { id: 'type', label: 'Type', minWidth: 100, align: 'center' },
  { id: 'activate', label: 'Activate', minWidth: 50, align: 'center' },
  { id: 'isCamera', label: 'Camera', minWidth: 100, align: 'center' },
  { id: 'isScreen', label: 'Screen', minWidth: 100, align: 'center' },
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

const Action = (props) => {
  const classes = useStyles()
  const {item, refresh} = props

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton aria-label="action" {...bindTrigger(popupState)}>
            <Menu className={classes.icon} />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <List dense={true}>
                <ListItem>
                  <Link to={`/corporate/exam/edit/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Edit"
                    />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={`/corporate/exam/result/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Result"
                    />
                  </Link>
                </ListItem>
                <ListItem>
                  <Delete item={item} refresh={refresh}>
                    <ListItemText
                      primary="Delete"
                      style={{color: '#E54C4C'}}
                    />
                  </Delete>
                </ListItem>
              </List>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

const Exam = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const classes = useStyles()
  const {id} = props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [limit, setLimit] = useState(10)
  const [auth, setAuth] = useState({})
  const [exams, setExams] = useState([])
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleActivate = (examId, activate) => {
    if (!auth?.corporate?.verified) {
      NotificationManager.warning('Verification Pending please contact Empowerr support info@empowerr.ai.', 'Warning', 3000);
      return
    }
    if (auth?.corporate?.candidateNumber < -100) {
      NotificationManager.warning('Please pay and get candidate number.', 'Warning', 3000);
      return
    }
    let tmp = {}
    tmp.id = examId
    tmp.activate = activate
    run(updateExam(tmp))
    setPending(true)
    setAsyncState('updateExam')
  }
  const refresh = (isSleep=true) => {
    if (isSleep)
      sleep(3000)
    setExams([])
    setFrom(limit)
    run(getExams({openingID: {eq: id}}, limit, 0))
    setAsyncState('getExams')
    setPending(true)
  }
  const loadMore = () => {
    run(getExams({openingID: {eq: id}}, limit, from))
    setAsyncState('getExams')
    setFrom(from+limit)
    setPending(true)
  }

  useEffect(() => {
    if (setting?.auth) {
      run(getAuth(setting?.auth?.id))
      setPending(true)
      setAsyncState('getAuth')
    }
  }, [run, setting?.auth])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getAuth') {
        setAuth(data)
        setExams([])
        setFrom(limit)
        run(getExams({openingID: {eq: id}}, limit, 0))
        setAsyncState('getExams')
      }
      else if (asyncState === 'getExams') {
        let tmp = data.map((item) => {
          item.duration = `${Math.ceil(item.totalTime/60)} min`
          if (item.camera)
            item.isCamera = "Yes"
          else
            item.isCamera = "No"
          if (item.screen)
            item.isScreen = "Yes"
          else
            item.isScreen = "No"
          item.questions = item?.right?.length + item?.left?.length
          if (!auth?.corporate?.verified || auth?.corporate?.candidateNumber < -100)
            item.activate = false
          return item
        })
        setExams([...exams, ...tmp])
        setPending(false)
      }
      else if (asyncState === 'updateExam') {
        refresh()
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
      <Link to={`/corporate/exam/create/${id}`} style={{textDecoration: 'none'}}>
        <Button style={{float: 'right', marginBottom: 10}} variant="outlined">Create Exam</Button>
      </Link>
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
                            <>
                              <Action item={row} refresh={refresh} />
                            </>
                          ):
                        column.id === 'activate'?
                          (row.activate?
                            (
                              <IconButton aria-label="detail" onClick={(e) => handleActivate(row.id, false)}>
                                <Favorite color={'primary'} />
                              </IconButton>
                            ):
                            (
                              <IconButton aria-label="detail" onClick={(e) => handleActivate(row.id, true)}>
                                <Favorite />
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
    </>
  )
}
export default Exam
