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
import {getFilter as getQuestions} from '../../../../api/question'
import {useAsync} from '../../../../functions/utils'
import {sleep} from '../../../../functions/common'
import SectionTitle from '../../../../components/section-title'
import Widget from '../../../../components/widget'
import Create from './create'
import Edit from './edit'
import Delete from './delete'

const Action = (props) => {
  const classes = useStyles()
  const {item, refresh, optionTypes} = props

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
                  <Edit item={item} refresh={refresh} optionTypes={optionTypes}>
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

const Question = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [questions, setQuestions] = useState([])
  const [pending, setPending] = useState(false)
  const optionTypes = ['SINGLE', 'MULTIFUL']

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
    run(getQuestions({paragraphID: {eq: id}}))
    setPending(true)
  }

  useEffect(() => {
    run(getQuestions({paragraphID: {eq: id}}))
    setPending(true)
  }, [run, id])
  useEffect(() => {
    if (status === 'resolved') {
      console.log(data)
      setQuestions(data)
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
      <SectionTitle 
        title="Questions of paragraph"
        subtitle="Questions of paragraph"
      />
      <Widget
        title=""
        description={
          <span>
            Questions
          </span>
        }>
        <Create refresh={refresh} optionTypes={optionTypes} paragraphId={id} />
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
                              <Action item={row} refresh={refresh} optionTypes={optionTypes} />
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
