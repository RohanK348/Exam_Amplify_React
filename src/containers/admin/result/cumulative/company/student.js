import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import {
  Grid,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {Search} from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'

import Widget from '../../../../../components/widget'
import {useAsync} from '../../../../../functions/utils'
import {getByPaginationFilter as getUsers} from '../../../../../api/user'
import {useStyles} from '../../../../style/common'

const Students = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const history = useHistory()
  const classes = useStyles()
  const [pageSize, setPageSize] = useState(5)
  const [from, setFrom] = useState(0)
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState({role: {eq: 'candidate'}})
  const [email, setEmail] = useState('')
  const [pending, setPending] = useState(false)
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
    setPending(true)
  }
  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  }
  const onPageChange = (param) => {
    const lastPage = Math.ceil(users.length/pageSize) - 1
    if (lastPage === param.page) {
      viewMore()
    }
  }
  const onRowClick = (param) => {
    if (param?.row?.id)
      history.push(`${process.env.PUBLIC_URL}/admin/result/cumulative/company/detail/${param?.row?.id}`)
  }
  const handleSearch = () => {
    if (email !== '') {
      const _filter = {role: {eq: 'candidate'}, email: {wildcard: `*${email}*`}}
      setFilter(_filter)
      setUsers([])
      run(getUsers(_filter, limit, 0))
      setFrom(limit)
      setPending(true)
    }
  }

  useEffect(() => {
    setUsers([])
    run(getUsers(filter, limit, 0))
    setFrom(limit)
    setPending(true)
  }, [run])
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
      setPending(false)
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
    <Widget
      title=""
      description={
        <span>
          Here are all students
        </span>
      }>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
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
              onRowClick={onRowClick}
            />
          </div>
        </Grid>
      </Grid>
    </Widget>
    
  )
}

export default Students