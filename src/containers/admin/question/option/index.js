import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  Checkbox,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import Widget from '../../../../components/widget'
import {getFilter} from '../../../../api/option'
import {useAsync} from '../../../../functions/utils'
import Create from './create'
import Edit from './edit'
import Delete from './delete'
import { update, replaceTrue } from '../../../../api/option'
import {sleep} from '../../../../functions/common'

const columns = [
  { id: 'isTrue', label: 'Is True', minWidth: 50, align: 'center' },
  { id: 'description', label: 'Description', minWidth: 100 },
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

const Option = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {questionId, questionType} = props
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [options, setOptions] = useState([])
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

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
    setOptions([])
    run(getFilter({questionID: {eq: questionId}}))
    setAsyncState('get')
    setPending(true)
  }
  const handleCheck = (e, item) => {
    if (questionType === 'SINGLE') {
      if (e.target.checked) {
        let from = options.filter((item) => item.isTrue)
        if (from.length === 0) {
          let tmp = {}
          tmp.id = item.id
          tmp.isTrue = e.target.checked
          run(update(tmp))
          setAsyncState('update')
        }
        else {
          run(replaceTrue(from[0].id, item.id))
          setAsyncState('update')
        }
        setPending(true)
      }
    }
    else {
      let tmp = {}
      tmp.id = item.id
      tmp.isTrue = e.target.checked
      run(update(tmp))
      setAsyncState('update')
      setPending(true)
    }
  }

  useEffect(() => {
    run(getFilter({questionID: {eq: questionId}}))
    setAsyncState('get')
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'get') {
        console.log(data)
        setOptions(data)
      }
      else if (asyncState === 'update') {
        refresh()
      }
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
      <Widget
        title="Option"
        description={
          <span>
            Here are Options
          </span>
        }>
        <Create refresh={refresh} questionId={questionId} isTrue={options.length === 0 && questionType === 'SINGLE'} />
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
              {options.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px', overflowWrap: 'anywhere'}}>
                          {column.id === 'action'?
                            (
                              <>
                                <Edit item={row} refresh={refresh} />
                                <Delete item={row} options={options} refresh={refresh} type={questionType} />
                              </>
                            ):
                            column.id === 'isTrue'?
                            <Checkbox
                              checked={row?.isTrue}
                              onChange={(e) => handleCheck(e, row)}
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                            />:
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
          count={options.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Widget>
    </>
  )
}
export default Option
