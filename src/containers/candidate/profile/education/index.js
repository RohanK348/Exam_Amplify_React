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
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { NotificationManager } from 'react-notifications'

import {getFilter as getEducations} from '../../../../api/education'
import {useAsync} from '../../../../functions/utils'
import Create from './create'
import Edit from './edit'
import Delete from './delete'

const columns = [
  { id: 'degree', label: 'Degree', minWidth: 100, align: 'center'},
  { id: 'branch', label: 'Branch', minWidth: 100, align: 'center' },
  { id: 'schoolName', label: 'School Name', minWidth: 100, align: 'center' },
  { id: 'courseName', label: 'Course Name', minWidth: 100, align: 'center' },
  { id: 'instituteName', label: 'Institute Name', minWidth: 100, align: 'center' },
  { id: 'collegeName', label: 'College Name', minWidth: 100, align: 'center' },
  { id: 'universityName', label: 'University Name', minWidth: 100, align: 'center' },
  { id: 'percentage', label: 'Percentage', minWidth: 100, align: 'center' },
  { id: 'grade', label: 'Grade', minWidth: 100, align: 'center' },
  { id: 'CGPA', label: 'CGPA', minWidth: 100, align: 'center' },
  // { id: 'year', label: 'Year', minWidth: 100 },
  // { id: 'ongoing', label: 'Ongoing', minWidth: 100 },
  // { id: 'place', label: 'Place', minWidth: 100 },
  // { id: 'state', label: 'State', minWidth: 100 },
  // { id: 'country', label: 'Country', minWidth: 100 },
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

const Education = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {user} = props
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [educations, setEducations] = useState([])
  const [pending, setPending] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const refresh = () => {
    run(getEducations({profileID: {eq: user?.profileID}}))
    setPending(true)
  }

  useEffect(() => {
    if (user) {
      run(getEducations({profileID: {eq: user?.profileID}}))
      setPending(true)
    }
  }, [run, user])
  useEffect(() => {
    if (status === 'resolved') {
      if (data.length === 0) {
        NotificationManager.warning('Please insert education', 'Worning', 3000);
      }
      let tmp = data.map((item) => {
        if (item.isOngoing)
          item.ongoing = 'ongoing'
        else
          item.ongoing = 'completed'
        return item
      })
      setEducations(tmp)
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
      <Create refresh={refresh} profileId={user?.profileID} />
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
            {educations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                        {column.id === 'action'?
                          (
                            <>
                              <Edit item={row} refresh={refresh} />
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
        count={educations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}
export default Education
