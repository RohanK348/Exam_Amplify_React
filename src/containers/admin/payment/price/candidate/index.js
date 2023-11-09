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
import {Menu} from '@material-ui/icons'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import SectionTitle from '../../../../../components/section-title'
import Widget from '../../../../../components/widget'
import {getByPagination as getPrices} from '../../../../../api/priceCandidate'
import {useAsync} from '../../../../../functions/utils'
import {useStyles} from '../../../../style/common'
import {sleep} from '../../../../../functions/common'
import Create from './create'
import Edit from './edit'
import Delete from './delete'

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
                  <Link to={`/admin/candidate/price/detail/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Detail"
                    />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={`/admin/candidate/coupon/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Coupons"
                    />
                  </Link>
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
  { id: 'index', label: 'Id', minWidth: 100, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
  { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
  { id: 'month', label: 'Month', minWidth: 100, align: 'center' },
  { id: 'train', label: 'Train', minWidth: 100, align: 'center' },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]

const PriceCandidate = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [prices, setPrices] = useState([])
  const [pending, setPending] = useState(false)
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
    setPrices([])
    setFrom(limit)
    run(getPrices(limit, 0))
    setPending(true)
  }
  const loadMore = () => {
    run(getPrices(limit, from))
    setFrom(from+limit)
    setPending(true)
  }

  useEffect(() => {
    setPrices([])
    setFrom(limit)
    run(getPrices(limit, 0))
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      console.log(data)
      setPrices([...prices, ...data])
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
      <SectionTitle title="Candidate Price" subtitle="Candidate Price management" />
      <Widget
        title="Candidate Price"
        description={
          <span>
            Here are prices
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
              {prices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                            column.id === 'index'?
                            index + 1:
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
          count={prices.length}
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
export default PriceCandidate
