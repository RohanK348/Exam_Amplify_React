import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
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
import {RemoveRedEye} from '@material-ui/icons'

import SectionTitle from '../../../../../components/section-title'
import Widget from '../../../../../components/widget'
import {getByPagination as getCorporates} from '../../../../../api/corporate'
import {useAsync} from '../../../../../functions/utils'
import AmplifyImage from '../../../../../components/amplifyImage'

const columns = [
  { id: 'company', label: 'Company', minWidth: 200 },
  { id: 'openingNumber', label: 'Opening', minWidth: 100, align: 'center' },
  { id: 'examNumber', label: 'Exam', minWidth: 100, align: 'center' },
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

const Company = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [companies, setCompanies] = useState([])
  const [pending, setPending] = useState(false)
  const limit = 10

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const loadMore = () => {
    run(getCorporates(limit, from))
    setFrom(from+limit)
    setPending(true)
  }

  useEffect(() => {
    setCompanies([])
    setFrom(limit)
    run(getCorporates(limit, 0))
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      console.log(data)
      setCompanies([...companies, ...data])
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
      <SectionTitle title="Company" subtitle="Company management" />
      <Widget
        title="Company"
        description={
          <span>
            Here are companies
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
              {companies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <>
                                <Link to={`/admin/result/company/${row.id}`} style={{textDecoration: 'none'}}>
                                  <IconButton aria-label="detail">
                                    <RemoveRedEye className={classes.icon} />
                                  </IconButton>
                                </Link>
                              </>
                            ):
                            column.id === 'company'?
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <AmplifyImage imageKey={row.logo} style={{width: 50, padding: 5}} />
                              <div style={{paddingLeft: 15}}>{row.companyName}</div>
                            </div>:
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
          count={companies.length}
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
export default Company
