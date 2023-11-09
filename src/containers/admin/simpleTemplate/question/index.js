import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
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
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import {Menu} from '@material-ui/icons'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import {useStyles} from '../../../style/common'
import {getQuestions} from '../../../../api/examSection'
import {update} from '../../../../api/simpleBrainTemplate'
import {useAsync} from '../../../../functions/utils'
import {sleep} from '../../../../functions/common'
import Create from './create'
import Edit from './edit'
import Delete from './delete'

const Action = (props) => {
  const classes = useStyles()
  const {item, refresh, sections, optionTypes} = props

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
                  <Edit item={item} refresh={refresh} sections={sections} optionTypes={optionTypes}>
                    <ListItemText
                      primary="Edit"
                    />
                  </Edit>
                </ListItem>
                <ListItem>
                  {item.type === 'PARAGRAPH' &&
                  <Link to={`/admin/simpleTemplate/paragraph/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Questions"
                    />
                  </Link>
                  }
                </ListItem>
                <ListItem>
                  <Delete item={item} refresh={refresh} sections={sections}>
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
  { id: 'description', label: 'Description', minWidth: 400 },
  { id: 'mark', label: 'Mark', minWidth: 100, align: 'center' },
  { id: 'type', label: 'Type', minWidth: 100, align: 'center' },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]

const Question = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {brainTemplate} = props
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sections, setSections] = useState([])
  const [questions, setQuestions] = useState([])
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')
  const optionTypes = ['SINGLE', 'MULTIFUL', 'PARAGRAPH']

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const refresh = (sections, isSleep=true) => {
    if (isSleep)
      sleep(2000)
    setSections(sections)
    let tmp = {}
    tmp.id = brainTemplate.id
    tmp.sections = sections
    run(update(tmp))
    setAsyncState('update')
    setPending(true)
  }

  useEffect(() => {
    setSections(brainTemplate.sections||[])
    run(getQuestions(brainTemplate.sections||[]))
    setAsyncState('getQuestions')
    setPending(true)
  }, [brainTemplate, run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getQuestions') {
        console.log(data)
        setQuestions(data)
        setAsyncState('')
        setPending(false)
      }
      else if (asyncState === 'update') {
        run(getQuestions(sections))
        setAsyncState('getQuestions')
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
      <Create refresh={refresh} sections={sections} optionTypes={optionTypes} brain={brainTemplate.brain} />
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
                            <Action item={row} refresh={refresh} sections={sections} optionTypes={optionTypes} />
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
    </>
  )
}
export default Question
