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
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import SectionTitle from '../../../../components/section-title'
import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'
import {getFilter} from '../../../../api/templateSubTopic'
import {get as getTemplateTopic} from '../../../../api/templateTopic'
import {getByPagination as getSubTopics} from '../../../../api/subtopic'
import {getComplexityTypes} from '../../../../api/enum'
import {useAsync} from '../../../../functions/utils'
import {sleep} from '../../../../functions/common'
import Create from './create'
import Edit from './edit'
import Delete from './delete'

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'complexity', label: 'Complexity', minWidth: 100 },
  { id: 'totalQuestion', label: 'Total Question', minWidth: 100 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]
const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  },
}))

const TemplateSubTopic = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [templateTopic, setTemplateTopic] = useState({})
  const [templateSubTopics, setTemplateSubTopics] = useState([])
  const [subTopics, setSubTopics] = useState([])
  const [subTopicFrom, setSubTopicFrom] = useState(0)
  const [complexityTypes, setComplexityTypes] = useState([])
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
    run(getFilter({templateTopicID: {eq: id}}))
    setAsyncState('getTemplateSubTopics')
    setPending(true)
  }
  const moreSubTopics = () => {
    run(getSubTopics({topicID: {eq: data.topicID}}, limit, subTopicFrom))
    setSubTopicFrom(subTopicFrom + limit)
    setAsyncState('getOnlySubTopics')
    setPending(true)
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
        run(getTemplateTopic(id))
        setAsyncState('getTemplateTopic')
      }
      else if (asyncState === 'getTemplateTopic') {
        setTemplateTopic(data)
        setSubTopics([])
        run(getSubTopics({topicID: {eq: data.topicID}}, limit, 0))
        setSubTopicFrom(limit)
        setAsyncState('getSubTopics')
      }
      else if (asyncState === 'getSubTopics') {
        setSubTopics([...subTopics, ...data])
        run(getFilter({templateTopicID: {eq: id}}))
        setAsyncState('getTemplateSubTopics')
      }
      else if (asyncState === 'getTemplateSubTopics') {
        setTemplateSubTopics(data)
        setPending(false)
        setAsyncState('')
      }
      else if (asyncState === 'getOnlySubTopics') {
        setSubTopics([...subTopics, ...data])
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
      <SectionTitle title="Template SubTopic" subtitle="Template SubTopic management" />
      <Widget
        title="Template SubTopic"
        description={
          <span>
            Here are SubTopics
          </span>
        }>
        <Link to={`/admin/template/${templateTopic.brain}/${templateTopic.templateID}`} style={{textDecoration: 'none'}}>
          <button className={`${classes.button} ${customeClasses.cancel}`} color="inherit" variant="outlined" >
            Back
          </button>
        </Link>
        <Create refresh={refresh} more={moreSubTopics} templateTopicId={id} subTopics={subTopics} complexityTypes={complexityTypes} />
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
              {templateSubTopics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <>
                                <Edit item={row} refresh={refresh} more={moreSubTopics} subTopics={subTopics} complexityTypes={complexityTypes} />
                                <Delete item={row} refresh={refresh} />
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
          count={templateSubTopics.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Widget>
    </>
  )
}
export default TemplateSubTopic
