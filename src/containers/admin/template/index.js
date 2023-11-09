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
import {Favorite, Menu} from '@material-ui/icons'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {useStyles} from '../../style/common'
import {getByPaginationFilter as getTemplates, update} from '../../../api/template'
import {sleep} from '../../../functions/common'
import {useAsync} from '../../../functions/utils'
import Create from './create'
import Edit from './edit'
import Delete from './delete'
import CreateExam from '../exam/create'


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
                <ListItem>
                  <Link to={`/admin/template/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Detail"
                    />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={`/admin/template/right/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Right Brain"
                    />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={`/admin/template/left/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Left Brain"
                    />
                  </Link>
                </ListItem>
                <ListItem>
                  <CreateExam templateId={item.id} template={item}>
                    <ListItemText
                      primary="Create Exam"
                    />
                  </CreateExam>
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
  { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
  { id: 'time', label: 'Total Time', minWidth: 50, align: 'center' },
  { id: 'activate', label: 'Activate', minWidth: 50, align: 'center' },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]

const Template = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
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
    run(getTemplates({isSimple: {eq: false}}, limit, 0))
    setAsyncState('get')
    setPending(true)
  }
  const handleActivate = (templateId, activate) => {
    let tmp = {}
    tmp.id = templateId
    tmp.activate = activate
    run(update(tmp))
    setPending(true)
    setAsyncState('update')
  }
  const loadMore = () => {
    setFrom(from+limit)
    run(getTemplates({isSimple: {eq: false}}, limit, from))
    setAsyncState('get')
  }

  useEffect(() => {
    setTemplates([])
    setFrom(limit)
    run(getTemplates({isSimple: {eq: false}}, limit, 0))
    setAsyncState('get')
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'get') {
        let tmp = data.map((item) => {
          item.time = `${Math.floor(item.totalTime/60)} min`
          return item
        })
        setTemplates([...templates, ...tmp])
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
      <SectionTitle title="Template" subtitle="Template management" />
      <Widget
        title="Template"
        description={
          <span>
            Here are templates
          </span>
        }>
        <Create refresh={refresh} />
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
                              <Action item={row} refresh={refresh} />
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
export default Template
