import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {RemoveRedEye, Favorite} from '@material-ui/icons'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import {useStyles} from '../../style/common'
import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {getFilter, update} from '../../../api/question'
import {get as getParagraph} from '../../../api/paragraph'
import {getComplexityTypes, getOptionTypes} from '../../../api/enum'
import {useAsync} from '../../../functions/utils'
import Create from './create'
import Edit from './edit'
import Delete from './delete'

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
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [questions, setQuestions] = useState([])
  const [complexityTypes, setComplexityTypes] = useState([])
  const [optionTypes, setOptionTypes] = useState([])
  const [subTopicId, setSubTopicId] = useState('')
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const refresh = () => {
    run(getFilter({paragraphID: {eq: id}, isAdmin: {eq: true}}))
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
        setOptionTypes(data)
        run(getFilter({paragraphID: {eq: id}, isAdmin: {eq: true}}))
        setAsyncState('getQuestions')
      }
      else if (asyncState === 'getQuestions') {
        setQuestions(data)
        run(getParagraph(id))
        setAsyncState('getParagraph')
      }
      else if (asyncState === 'getParagraph') {
        setSubTopicId(data?.subTopicID)
        setPending(false)
        setAsyncState('')
      }
      else if (asyncState === 'update') {
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
      <SectionTitle title="Paragraph Detail" subtitle="Question management" />
      <Widget
        title="Paragraph Detail"
        description={
          <span>
            Here are Questions
          </span>
        }>
        <Create refresh={refresh} paragraphId={id} subTopicId={subTopicId} complexityTypes={complexityTypes} optionTypes={optionTypes} />
        {/* <Link to={`/admin/subtopic/${subTopicId}`} style={{textDecoration: 'none'}}>
          <button className={classes.button} color="inherit" variant="outlined" >
            Back
          </button>
        </Link> */}
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
                              <>
                                <Edit item={row} refresh={refresh} complexityTypes={complexityTypes} optionTypes={optionTypes} />
                                <Delete item={row} refresh={refresh} />
                                <Link to={`/admin/question/${row.id}`} style={{textDecoration: 'none'}}>
                                  <IconButton aria-label="detail">
                                    <RemoveRedEye className={classes.icon} />
                                  </IconButton>
                                </Link>
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
      </Widget>
    </>
  )
}
export default Question
