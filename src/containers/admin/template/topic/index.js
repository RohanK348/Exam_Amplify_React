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
import {RemoveRedEye} from '@material-ui/icons'

import SectionTitle from '../../../../components/section-title'
import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'
import {getFilter} from '../../../../api/templateTopic'
import {getByPaginationFilter as getTopics} from '../../../../api/topic'
import {useAsync} from '../../../../functions/utils'
import {sleep} from '../../../../functions/common'
import Create from './create'
import Edit from './edit'
import Delete from './delete'

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'brain', label: 'Brain', minWidth: 50 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]

const TemplateTopic = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id, brain} = useParams()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [templateTopics, setTemplateTopics] = useState([])
  const [topics, setTopics] = useState([])
  const [topicFrom, setTopicFrom] = useState(0)
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
  const refresh = (isSleep = true) => {
    if (isSleep)
      sleep(2000)
    run(getFilter({templateID: {eq: id}, brain: {eq: brain}}))
    setPending(true)
    setAsyncState('getTemplates')
  }
  const moreTopics = () => {
    run(getTopics({brain: {eq: brain}}, limit, topicFrom))
    setTopicFrom(topicFrom + limit)
    setAsyncState('getOnlyTopics')
    setPending(true)
  }

  useEffect(() => {
    setTopics([])
    run(getTopics({brain: {eq: brain}}, limit, 0))
    setTopicFrom(limit)
    setAsyncState('getTopics')
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getTopics') {
        console.log(data)
        setTopics([...topics, ...data])
        run(getFilter({templateID: {eq: id}, brain: {eq: brain}}))
        setAsyncState('getTemplates')
      }
      else if (asyncState === 'getTemplates') {
        setTemplateTopics(data)
        setPending(false)
        setAsyncState('')
      }
      else if (asyncState === 'getOnlyTopics') {
        setTopics([...topics, ...data])
        setAsyncState('')
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
      <SectionTitle title="Template Topic" subtitle="Template Topic management" />
      <Widget
        title="Template Topic"
        description={
          <span>
            Here are Template Topics
          </span>
        }>
        <Create refresh={refresh} more={moreTopics} templateId={id} brain={brain} topics={topics} />
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
              {templateTopics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <>
                                <Edit item={row} refresh={refresh} more={moreTopics} topics={topics} />
                                <Delete item={row} refresh={refresh} />
                                <Link to={`/admin/template/topic/${row.id}`} style={{textDecoration: 'none'}}>
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
          count={templateTopics.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Widget>
    </>
  )
}
export default TemplateTopic
