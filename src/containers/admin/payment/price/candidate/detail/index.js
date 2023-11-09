import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
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

import {usePriceCandidate} from '../../../../../../provider/priceCandidate'
import SectionTitle from '../../../../../../components/section-title'
import Widget from '../../../../../../components/widget'
import {useStyles} from '../../../../../style/common'
import {get} from '../../../../../../api/priceCandidate'
import {useAsync} from '../../../../../../functions/utils'
import Create from './create'
import Edit from './edit'
import Delete from './delete'
import Save from './save'

const columns = [
  { id: 'info', label: 'Info', minWidth: 200 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]

const Detail = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {id} = useParams()
  const [priceCandidate, dispatch] = usePriceCandidate()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [details, setDetails] = useState([])
  const [pending, setPending] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    run(get(id))
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (data) {
        dispatch({type: 'SET', name: 'details', value: data.details})
      }
      setPending(false)
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  useEffect(() => {
    if (priceCandidate?.details) {
      setDetails(priceCandidate?.details)
    }
  }, [priceCandidate?.details])
  return (
    <>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <SectionTitle title="Price Candidate" subtitle="Price Candidate Detail" right={<Save id={id} />} />
      <Widget
        title="Detail"
        description={
          <span>
            Here are Details
          </span>
        }>
        <Create />
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
              {details.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row;
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <>
                                <Edit item={row} index={index} />
                                <Delete item={row} index={index} />
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
          count={details.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Widget>
    </>
  )
}
export default Detail
