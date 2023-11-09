import React, {useState, useEffect} from 'react'
import {
  Button,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  IconButton,
} from '@material-ui/core'
import {Delete} from '@material-ui/icons'

import {useAsync} from '../../../functions/utils'
import {getStudentsByPa as getUsers} from '../../../api/favoriteOpening'
import {useStyles} from '../../style/common'

const AppliedUsers = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {id} = props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from, setFrom] = useState(0)
  const [users, setUsers] = useState([])
  const limit = 10
  const columns = [
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'passingYear', label: 'Passing Year', minWidth: 150 },
    { id: 'lastDegree', label: 'Last Academic Grade', minWidth: 200 },
    { id: 'course', label: 'Course', minWidth: 150 },
    { id: 'college', label: 'College', minWidth: 150 },
    // {
    //   id: 'action',
    //   label: 'Action',
    //   minWidth: 170,
    //   align: 'center',
    // },
  ]
  const degrees = ['10', '+2', 'diploma', 'degree', 'master', 'phd']

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const loadMore = () => {
    run(getUsers({openingID: {eq: id}}, limit, from))
    setFrom(from+limit)
  }
  
  useEffect(() => {
    setUsers([])
    run(getUsers({openingID: {eq: id}}, limit, 0))
    setFrom(limit)
  }, [run, id])
  useEffect(() => {
    if (status === 'resolved') {
      let tmp = data.map((user) => {
        let educations = user?.profile?.educations?.items
        if (educations.length !== 0) {
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
      setUsers([...users, ...tmp])
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
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
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: 10}}>
                        {column.id === 'action'?
                          (
                            <IconButton aria-label="delete">
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button style={{marginTop: 10}} variant="outlined" onClick={loadMore}>View More</Button>
      </div>
    </>
  )
}

export default AppliedUsers