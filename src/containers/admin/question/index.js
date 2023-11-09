import React, {useState, useEffect, useRef} from 'react'
import {Link, useParams} from 'react-router-dom'
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
  IconButton,
  Button,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import {Menu, Favorite} from '@material-ui/icons'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import {useStyles} from '../../style/common'
import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {getByPagination as getQuestions, update} from '../../../api/question'
import {getByPaginationFilter as getParagraphs} from '../../../api/paragraph'
import {getComplexityTypes, getOptionTypes} from '../../../api/enum'
import {useAsync} from '../../../functions/utils'
import {sleep} from '../../../functions/common'
import Create from './create'
import Edit from './edit'
import Delete from './delete'
import Back from './back'
import SearchFrom from './searchForm'

const Action = (props) => {
  const classes = useStyles()
  const {item, refresh, complexityTypes, optionTypes} = props

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
                  <Edit item={item} refresh={refresh} complexityTypes={complexityTypes} optionTypes={optionTypes}>
                    <ListItemText
                      primary="Edit"
                    />
                  </Edit>
                </ListItem>
                <ListItem>
                  {item.type === 'PARAGRAPH'?
                  <Link to={`/admin/paragraph/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Questions"
                    />
                  </Link>:
                  <Link to={`/admin/question/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Options"
                    />
                  </Link>
                  }
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

const columns = [
  { id: 'complexity', label: 'Complexity', minWidth: 100 },
  { id: 'activate', label: 'Activate', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 400 },
  { id: 'time', label: 'Time', minWidth: 100 },
  { id: 'mark', label: 'Mark', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]

const Question = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  const classes = useStyles()
  const searchFormRef = useRef()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [questions, setQuestions] = useState([])
  const [tmpQuestions, setTmpQuestions] = useState([])
  const [complexityTypes, setComplexityTypes] = useState([])
  const [optionTypes, setOptionTypes] = useState([])
  const [filter, setFilter] = useState({subTopicID: {eq: id}, paragraphID: {eq: ''}, isAdmin: {eq: true}})
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
  const search = (newFilter) => {
    setFilter(newFilter)
    setQuestions([])
    setFrom(0)
    run(getQuestions(newFilter, limit, 0))
    setAsyncState('getQuestions')
    setPending(true)
  }
  const refresh = (isSleep=true) => {
    if (isSleep)
      sleep(2000)
    setQuestions([])
    setFrom(0)
    setFilter({subTopicID: {eq: id}, paragraphID: {eq: ''}, isAdmin: {eq: true}})
    searchFormRef.current.init()
    run(getQuestions({subTopicID: {eq: id}, paragraphID: {eq: ''}, isAdmin: {eq: true}}, limit, 0))
    setAsyncState('getQuestions')
    setPending(true)
  }
  const handleActivate = (questionId, activate) => {
    let tmp = {}
    tmp.id = questionId
    tmp.activate = activate
    run(update(tmp))
    setPending(true)
    setAsyncState('update')
  }
  const loadMore = () => {
    run(getQuestions(filter, limit, from))
    setAsyncState('getQuestions')
  }

  useEffect(() => {
    run(getComplexityTypes())
    setAsyncState('getComplexityTypes')
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getComplexityTypes') {
        setComplexityTypes(data)
        run(getOptionTypes())
        setAsyncState('getOptionTypes')
      }
      else if (asyncState === 'getOptionTypes') {
        let tmp = [...data, {name: 'PARAGRAPH'}]
        setOptionTypes(tmp)
        setQuestions([])
        setFrom(0)
        run(getQuestions(filter, limit, 0))
        setAsyncState('getQuestions')
      }
      else if (asyncState === 'getQuestions') {
        console.log('questions', data)
        setTmpQuestions(data)
        run(getParagraphs({subTopicID: {eq: id}, isAdmin: {eq: true}}, limit, from))
        setFrom(from + limit)
        setAsyncState('getParagraphs')
      }
      else if (asyncState === 'getParagraphs') {
        let tmp = data.map((item) => {
          item.type = 'PARAGRAPH'
          return item
        })
        tmp = [...tmpQuestions, ...tmp]
        tmp.sort((a, b) => {
          let comparison = 0;
          if (a.createdAt > b.createdAt) {
            comparison = 1;
          } else if (a.createdAt < b.createdAt) {
            comparison = -1;
          }
          return comparison;
        })
        setQuestions([...questions, ...tmp])
        setAsyncState('')
        setPending(false)
      }
      else if (asyncState === 'update') {
        refresh(false)
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
      <SectionTitle title="Question" subtitle="Question management" />
      <Widget
        title="Question"
        description={
          <span>
            Here are Questions
          </span>
        }>
        <SearchFrom ref={searchFormRef} complexityTypes={complexityTypes} subTopicId={id} search={search} />
        <Back id={id} />
        <Create refresh={refresh} subTopicId={id} complexityTypes={complexityTypes} optionTypes={optionTypes} />
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
              {questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <Action item={row} refresh={refresh} complexityTypes={complexityTypes} optionTypes={optionTypes} />
                            ):
                            column.id === 'activate' && row.type !== 'PARAGRAPH'?
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
                            column.id === 'description'?
                            <SunEditor
                              defaultValue={value}
                              disable={true}
                              hideToolbar
                              setDefaultStyle="height: auto"
                            />:
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
          count={questions.length}
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
export default Question
