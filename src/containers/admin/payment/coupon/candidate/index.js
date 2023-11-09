import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  Button,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import SectionTitle from '../../../../../components/section-title'
import Widget from '../../../../../components/widget'
import {getByPaginationFilter as getCoupons} from '../../../../../api/couponCandidate'
import {useAsync} from '../../../../../functions/utils'
import {useStyles} from '../../../../style/common'
import {sleep} from '../../../../../functions/common'
import Create from './create'
import Delete from './delete'

const columns = [
  { id: 'code', label: 'Code', minWidth: 100, align: 'center' },
  { id: 'discount', label: 'Discount', minWidth: 100, align: 'center' },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]

const Coupon = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {id} = useParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [coupons, setCoupons] = useState([])
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
    setCoupons([])
    setFrom(limit)
    run(getCoupons({priceID: {eq: id}}, limit, 0))
    setPending(true)
  }
  const loadMore = () => {
    run(getCoupons({priceID: {eq: id}}, limit, from))
    setFrom(from+limit)
    setPending(true)
  }

  useEffect(() => {
    setCoupons([])
    setFrom(limit)
    run(getCoupons({priceID: {eq: id}}, limit, 0))
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      let tmp = data.map((item) => {
        let discount = ''
        if (item.isFree)
          discount = 'Free'
        else {
          discount = `${item.percentage} %`
        }
        item.discount = discount
        return item
      })
      setCoupons([...coupons, ...tmp])
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
      <SectionTitle title="Candidate Coupon" subtitle="Candidate Coupon management" />
      <Widget
        title="Candidate Coupon"
        description={
          <span>
            Here are coupons
          </span>
        }>
        <Create priceId={id} refresh={refresh} />
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
              {coupons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <>
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
          count={coupons.length}
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
export default Coupon
