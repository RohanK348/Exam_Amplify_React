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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Delete, Search} from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'

import Widget from '../../../../components/widget'
import {useAsync} from '../../../../functions/utils'
import {getByPaginationFilter as getUsers} from '../../../../api/user'
import {useStyles} from '../../../style/common'

const SelectedUser = (props) => {
  const {selectedUsers, deleteUserId} = props
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const columns = [
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'passingYear', label: 'Passing Year', minWidth: 150 },
    { id: 'lastDegree', label: 'Last Academic Grade', minWidth: 200 },
    { id: 'course', label: 'Course', minWidth: 150 },
    { id: 'college', label: 'College', minWidth: 150 },
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
            {selectedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
        count={selectedUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}

const useCustomStyles = makeStyles((theme) => ({
  cancel: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
  }
}))

const AddUser = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const customeClasses = useCustomStyles()
  const classes = useStyles()
  const {exam, setInfo, nextStep, prevStep} = props
  const [pageSize, setPageSize] = useState(5)
  const [from, setFrom] = useState(0)
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState({role: {eq: 'candidate'}})
  const [selectedUserIds, setSelectedUserIds] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [email, setEmail] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const limit = 30
  const columns = [
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'passingYear', headerName: 'Passing Year', width: 150 },
    { field: 'lastDegree', headerName: 'Last Academic Grade', width: 200 },
    { field: 'course', headerName: 'Course', width: 150 },
    { field: 'college', headerName: 'College', width: 150 },
  ]
  const degrees = ['10', '+2', 'diploma', 'degree', 'master', 'phd']

  const viewMore = () => {
    run(getUsers(filter, limit, from))
    setFrom(from+limit)
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
  const handlePrev = () => {
    prevStep()
  }
  const handleContinue = () => {
    setInfo({
      students: selectedUserIds,
    })
    nextStep()
  }
  const deleteUserId = (id) => {
    const index = selectedUserIds.indexOf(id)
    let tmp = [...selectedUserIds.slice(0, index), ...selectedUserIds.slice(index + 1)]
    setSelectedUserIds(tmp)
    tmp = [...selectedUsers.slice(0, index), ...selectedUsers.slice(index + 1)]
    setSelectedUsers(tmp)
  }
  const handleSearch = () => {
    if (email !== '') {
      const _filter = {role: {eq: 'candidate'}, email: {wildcard: `*${email}*`}}
      setFilter(_filter)
      setIsSearch(true)
      run(getUsers(_filter, limit, 0))
      setFrom(limit)
    }
  }

  useEffect(() => {
    setSelectedUserIds(exam?.students||[])
  }, [exam])
  useEffect(() => {
    setUsers([])
    run(getUsers(filter, limit, 0))
    setFrom(limit)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      let tmp = data.map((user) => {
        let educations = user?.profile?.educations?.items
        if (educations && educations.length !== 0) {
          educations.sort((a, b) => {
            let comparison = 0;
            const aIndex = degrees.indexOf(a.degree)
            const bIndex = degrees.indexOf(b.degree)
            if (aIndex < bIndex) {
              comparison = 1;
            } else if (aIndex > bIndex) {
              comparison = -1;
            }
            return comparison;
          })
          user.passingYear = educations[0].year
          user.lastDegree = educations[0].degree
          user.course = educations[0].courseName
          user.college = educations[0].collegeName
        }
        return user
      })
      if (isSearch) {
        setUsers([...tmp, ...users])
      }
      else
        setUsers([...users, ...tmp])
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  useEffect(() => {
    const tmp = users.filter((item) => selectedUserIds.indexOf(item.id) > -1)
    setSelectedUsers(tmp)
  }, [selectedUserIds, users])
  return (
    <Widget
      title=""
      description={
        <span>
          Add User in the private exam
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
                setSelectedUserIds(newSelection.selectionModel);
              }}
              selectionModel={selectedUserIds}
            />
          </div>
          <SelectedUser selectedUsers={selectedUsers} deleteUserId={deleteUserId} />
        </Grid>
        <Grid item xs={12} style={{height: 150, paddingTop: 50}}>
          <button className={`${classes.button} ${customeClasses.cancel}`} onClick={handlePrev}>Cancel</button>
          <button className={classes.button} style={{float: 'right'}} onClick={handleContinue}>Save <span>&#38;</span> Continue</button>
        </Grid>
      </Grid>
    </Widget>
    
  )
}

export default AddUser