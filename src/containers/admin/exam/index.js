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
  Box,
  List,
  ListItem,
  ListItemText,
  Popover,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {getByPagination as getExams} from '../../../api/exam'
import {useAsync} from '../../../functions/utils'
import {sleep} from '../../../functions/common'
import Edit from './edit'
import Delete from './delete'

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'method', label: 'Method', minWidth: 100 },
  { id: 'totalTime', label: 'totalTime', minWidth: 100, align: 'center' },
  { id: 'rightBrainTime', label: 'RightBrainTime', minWidth: 100, align: 'center' },
  { id: 'leftBrainTime', label: 'LeftBrainTime', minWidth: 100, align: 'center' },
  { id: 'random', label: 'Random', minWidth: 100, align: 'center' },
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
                  <Edit item={item} refresh={refresh}>
                    <ListItemText
                      primary="Edit"
                    />
                  </Edit>
                </ListItem>
                <ListItem>
                  <Delete item={item} refresh={refresh}>
                    <ListItemText
                      primary="Delete"
                      style={{color: '#E54C4C'}}
                    />
                  </Delete>
                </ListItem>
                {!item.isRandom&&
                <ListItem>
                  <Link to={`/admin/exam/view/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="View"
                    />
                  </Link>
                </ListItem>
                }
              </List>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

const Exam = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from, setFrom] = useState(0)
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
  const refresh = () => {
    sleep(2000)
    setExams([])
    run(getExams({openingID: {eq: ''}}, limit, 0))
    setFrom(limit)
    setPending(true)
  }
  const loadMore = () => {
    run(getExams({openingID: {eq: ''}}, limit, from))
    setFrom(from + limit)
    setPending(true)
  }

  useEffect(() => {
    setExams([])
    run(getExams({openingID: {eq: ''}}, limit, 0))
    setFrom(limit)
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      console.log(data)
      let tmp = data.map((exam) => {
        if (exam.isRandom)
          exam.random = 'Random'
        else
          exam.random = 'Fixed'
        return exam
      })
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
      <SectionTitle title="Exam" subtitle="Exam management" />
      <Widget
        title="Exam"
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
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <Action item={row} refresh={refresh} />
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
export default Exam
