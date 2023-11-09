import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
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
import {Add} from '@material-ui/icons'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {useStyles} from '../../style/common'
import {getByPaginationFilter as getTemplates, update} from '../../../api/template'
import {sleep} from '../../../functions/common'
import {useAsync} from '../../../functions/utils'

const columns = [
  { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]

const SimpleTemplate = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [templates, setTemplates] = useState([])
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
  const refresh = (isSleep=true) => {
    if (isSleep)
      sleep(2000)
    setTemplates([])
    setFrom(limit)
    run(getTemplates({isSimple: {eq: true}, corporateID: {eq: id}}, limit, 0))
    setAsyncState('get')
    setPending(true)
  }
  const handleAdd = (templateId) => {
    let tmp = {}
    tmp.id = templateId
    tmp.corporateID = ''
    run(update(tmp))
    setPending(true)
    setAsyncState('update')
  }
  const loadMore = () => {
    setFrom(from+limit)
    run(getTemplates({isSimple: {eq: true}, corporateID: {eq: id}}, limit, from))
    setAsyncState('get')
  }

  useEffect(() => {
    setTemplates([])
    setFrom(limit)
    run(getTemplates({isSimple: {eq: true}, corporateID: {eq: id}}, limit, 0))
    setAsyncState('get')
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'get') {
        setTemplates([...templates, ...data])
        setPending(false)
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
      <SectionTitle title="Company Template" subtitle="Template management" />
      <Widget
        title="Company Template"
        description={
          <span>
            Here are templates
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
              {templates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <IconButton aria-label="detail" onClick={(e) => handleAdd(row.id)}>
                                <Add color={'primary'} />
                              </IconButton>
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
          count={templates.length}
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
export default SimpleTemplate
