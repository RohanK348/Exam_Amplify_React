import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {RemoveRedEye} from '@material-ui/icons'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {getAnalisis} from '../../../api/examResult'
import {useAsync} from '../../../functions/utils'
import Excel from './excel'

const columns = [
  { id: 'name', label: 'Title', minWidth: 150, align: 'center' },
  { id: 'totalStudents', label: 'Students', minWidth: 100, align: 'center' },
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
    maxHeight: 500,
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

const Result = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {id} = useParams()
  const [analisis, setAnalisis] = useState([])
  const [pending, setPending] = useState(false)

  useEffect(() => {
    run(getAnalisis(id))
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      setAnalisis(data)
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
      <SectionTitle 
        title="Exam Result" 
        subtitle="Exam Result management" 
        right={
          <Excel examId={id} />
        }
      />
      <Widget
        title="Analisis"
        description={
          <span>
            Here are analisis
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
              {analisis.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <>
                                <Link to={`/corporate/exam/result/${id}/${row.index}`} style={{textDecoration: 'none'}}>
                                  <IconButton aria-label="detail">
                                    <RemoveRedEye className={classes.icon} />
                                  </IconButton>
                                </Link>
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
      </Widget>
    </>
  )
}
export default Result
