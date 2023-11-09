import React, {useState, useEffect} from 'react'
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
  Button,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {getByPagination as getCorporates, update as updateCorporate} from '../../../api/corporate'
import {useAsync} from '../../../functions/utils'
import AmplifyImage from '../../../components/amplifyImage'
import {useStyles} from '../../style/common'
import {sleep} from '../../../functions/common'

const Action = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {item, refresh} = props
  const [pending, setPending] = useState(false)

  const accept = () => {
    run(updateCorporate({
      id: item.id,
      verified: true,
    }))
    setPending(true)
  }
  const reject = () => {
    run(updateCorporate({
      id: item.id,
      verified: false,
    }))
    setPending(false)
  }

  useEffect(() => {
    if (status === 'resolved') {
      refresh()
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
                    <ListItemText
                      className="cursor-pointer"
                      onClick={accept}
                      primary="Accept"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className="cursor-pointer text-red-300"
                      onClick={reject}
                      primary="Reject"
                    />
                  </ListItem>
                </List>
              </Box>
            </Popover>
          </div>
        )}
      </PopupState>
    </>
  )
}

const columns = [
  { id: 'company', label: 'Company', minWidth: 200 },
  { id: 'openingNumber', label: 'Opening', minWidth: 100, align: 'center' },
  { id: 'verified', label: 'Status', minWidth: 100, align: 'center' },
  {
    id: 'action',
    label: '',
    minWidth: 100,
    align: 'center',
  },
]

const VerifyCompany = () => {
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
  const refresh = (isSleep=true) => {
    if (isSleep)
      sleep(200)
    setCompanies([])
    setFrom(limit)
    run(getCorporates(limit, 0))
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
      <SectionTitle title="Company" subtitle="Company Verify Manage" />
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
                              <Action item={row} refresh={refresh} />
                            ):
                          column.id === 'company'?
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <AmplifyImage imageKey={row.logo} style={{width: 50, padding: 5}} />
                              <div style={{paddingLeft: 15}}>{row.companyName}</div>
                            </div>:
                          column.id === 'verified'?
                            (
                              value === true?
                              <span className="text-green-300">verified</span>:
                              value === false?
                              <span className="text-red-300">rejected</span>:
                              <span className="text-gray-300">pending</span>
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
          count={companies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button style={{marginTop: 10}} variant="outlined" onClick={loadMore}>View More</Button>
        </div>
      </Widget>
    </>
  )
}
export default VerifyCompany
