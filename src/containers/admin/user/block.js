import React, {useState, useEffect} from 'react'
import {
  Grid,
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
import {Delete, Search} from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'
import { NotificationManager } from 'react-notifications'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {useAsync} from '../../../functions/utils'
import {getByPaginationFilter as getUsers, updateBlocks} from '../../../api/user'
import {useStyles} from '../../style/common'

const BlockedUser = (props) => {
  const {blockedUsers, deleteUserId} = props
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const columns = [
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 150 },
    { id: 'phone', label: 'Phone Number', minWidth: 100 },
    { id: 'role', label: 'Type', minWidth: 50 },
    { id: 'companyName', label: 'Company Name', minWidth: 150 },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'center',
    },
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <div className="text-base p-4">Blocked Users</div>
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
            {blockedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                        {column.id === 'action'?
                          (
                            <IconButton aria-label="delete" onClick={() => deleteUserId(row.id)}>
                              <Delete className={classes.icon} />
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
        count={blockedUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}

const Block = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [pageSize, setPageSize] = useState(5)
  const [from, setFrom] = useState(0)
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState({or: [
    {role: {eq: 'candidate'}}, 
    {role: {eq: 'corporate'}}
  ]})
  const [blockedUserIds, setBlockedUserIds] = useState([])
  const [blockedUsers, setBlockedUsers] = useState([])
  const [email, setEmail] = useState('')
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')
  const limit = 30
  const columns = [
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'phone', headerName: 'Phone Number', width: 150 },
    { field: 'role', headerName: 'Type', width: 150 },
    { field: 'companyName', headerName: 'Company Name', width: 150 },
  ]

  const viewMore = () => {
    run(getUsers(filter, limit, from))
    setFrom(from+limit)
    setPending(true)
    setAsyncState('getUsers')
  }
  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  }
  const onPageChange = (params) => {
    const lastPage = Math.ceil(users.length/pageSize) - 1
    if (lastPage === params.page) {
      viewMore()
    }
  }
  const deleteUserId = (id) => {
    const index = blockedUserIds.indexOf(id)
    let tmp = [...blockedUserIds.slice(0, index), ...blockedUserIds.slice(index + 1)]
    setBlockedUserIds(tmp)
    tmp = [...blockedUsers.slice(0, index), ...blockedUsers.slice(index + 1)]
    setBlockedUsers(tmp)
  }
  const handleSearch = () => {
    if (email !== '') {
      let _filter = {or: [
        {role: {eq: 'candidate'}},
        {role: {eq: 'corporate'}},
      ], email: {wildcard: `*${email}*`}}
      setFilter(_filter)
      setUsers([])
      setBlockedUserIds([])
      setBlockedUsers([])
      run(getUsers(_filter, limit, 0))
      setFrom(limit)
      setPending(true)
      setAsyncState('getUsers')
    }
  }
  const handleSave = () => {
    let tmpUsers = users.map((user) => {
      let isBlock = false
      if (blockedUserIds.indexOf(user.id) > -1)
        isBlock = true
      let tmp = {}
      tmp.id = user.id
      tmp.isBlock = isBlock
      return tmp
    })
    run(updateBlocks(tmpUsers))
    setPending(true)
    setAsyncState('updateBlocks')
  }

  useEffect(() => {
    setUsers([])
    setBlockedUserIds([])
    setBlockedUsers([])
    run(getUsers(filter, limit, 0))
    setFrom(limit)
    setPending(true)
    setAsyncState('getUsers')
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getUsers') {
        let tmp = data.filter((user) => user.isBlock)
        tmp = tmp.map((user) => user.id)
        setBlockedUserIds([...blockedUserIds, ...tmp])
        setUsers([...users, ...data])
        setPending(false)
        setAsyncState('')
      }
      else if (asyncState === 'updateBlocks') {
        NotificationManager.success('Success saved all blocked users', 'Success', 3000);
        setPending(false)
        setAsyncState('')
      }
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  useEffect(() => {
    const tmp = users.filter((item) => blockedUserIds.indexOf(item.id) > -1)
    setBlockedUsers(tmp)
  }, [blockedUserIds, users])
  return (
    <>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <SectionTitle title="User Block" subtitle="User Block Manage" />
      <Widget
        title=""
        description={
          <span>
            User Block Manage
          </span>
        }>
        <Grid container>
          <Grid item md={8} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={3} md={4} xs={12}>
                <div className="form-element">
                  <div className="form-label">Email</div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item lg={3} md={4} xs={12}>
                <IconButton aria-label="delete" onClick={handleSearch} style={{marginTop: 20}}>
                  <Search className={classes.icon} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={8} xs={12}>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                columns={columns}
                rows={users}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                rowsPerPageOptions={[5, 10, 20]}
                onPageChange={onPageChange}
                checkboxSelection
                onSelectionModelChange={(newSelection) => {
                  setBlockedUserIds(newSelection.selectionModel);
                }}
                selectionModel={blockedUserIds}
              />
            </div>
            <BlockedUser blockedUsers={blockedUsers} deleteUserId={deleteUserId} />
          </Grid>
          <Grid item xs={12} style={{height: 150, paddingTop: 50}}>
            <button className={classes.button} style={{float: 'right'}} onClick={handleSave}>Save</button>
          </Grid>
        </Grid>
      </Widget>
    </>
  )
}

export default Block