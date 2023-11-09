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
  Tooltip,
  Button,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {RemoveRedEye, Star} from '@material-ui/icons'

import Widget from '../../../components/widget'
import SectionTitle from '../../../components/section-title'
import {getFilter as getFavorites, 
  add as addFavorite, 
  remove as removeFavorite, 
  getOpeningsByPa as getOpenings
} from '../../../api/favoriteOpening'
import {useAsync} from '../../../functions/utils'
// import {sleep} from '../../../functions/common'
import {useSetting} from '../../../provider/setting'

const columns = [
  { id: 'title', label: 'Title', minWidth: 150, align: 'center' },
  { id: 'examNumber', label: 'Exam', minWidth: 100, align: 'center' },
  { id: 'favorite', label: 'Favorite', minWidth: 100, align: 'center' },
  {
    id: 'action',
    label: '',
    minWidth: 100,
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

const FavoriteOpening = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [openings, setOpenings] = useState([])
  const [favorites, setFavorites] = useState([])
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')
  const limit = 10

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleActivate = (openingId, activate) => {
    if (activate) {
      run(addFavorite(setting.auth.id, openingId))
      setAsyncState('addFavorite')
    }
    else {
      run(removeFavorite(setting.auth.id, openingId))
      setAsyncState('removeFavorite')
    }
  }
  const loadMore = () => {
    run(getOpenings({userID: {eq: setting.auth.id}}, limit, from))
    setFrom(from+limit)
    setPending(true)
    setAsyncState('getOpenings')
  }

  useEffect(() => {
    if (setting.auth) {
      setOpenings([])
      setFrom(limit)
      run(getOpenings({userID: {eq: setting.auth.id}}, limit, 0))
      setPending(true)
      setAsyncState('getOpenings')
    }
  }, [run, setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getOpenings') {
        let tmp = data.map((item) => {
          item._exam = item?.exams?.items?.length
          return item
        })
        setOpenings([...openings, ...tmp])
        run(getFavorites({userID: {eq: setting.auth.id}}))
        setAsyncState('getFavorites')
      }
      else if (asyncState === 'getFavorites') {
        let tmp = data.map((item) => item.openingID)
        setFavorites(tmp)
        setPending(false)
        setAsyncState('')
      }
      else if (asyncState === 'addFavorite') {
        setFavorites([...favorites, data])
      }
      else if (asyncState === 'removeFavorite') {
        var index = favorites.indexOf(data)
        let tmp = [...favorites.slice(0, index), ...favorites.slice(index + 1)]
        setFavorites(tmp)
      }
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
      <SectionTitle title="Applied Opening" subtitle="Applied Opening" />
      <Widget
        title=""
        description={
          <span>
            FAVORITE OPENINGS
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
              {openings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14, padding: '0px 10px'}}>
                          {column.id === 'action'?
                            (
                              <Link to={`/opening/detail/${row.id}`} style={{textDecoration: 'none'}}>
                                <Tooltip title="Detail" placement="top-end">
                                  <IconButton aria-label="action">
                                    <RemoveRedEye className={classes.icon} />
                                  </IconButton>
                                </Tooltip>
                              </Link>
                            ):
                          column.id === 'favorite'?
                            (favorites.indexOf(row.id) > -1 ?
                              (
                                <IconButton aria-label="detail" onClick={(e) => handleActivate(row.id, false)}>
                                  <Star color={'primary'} />
                                </IconButton>
                              ):
                              (
                                <IconButton aria-label="detail" onClick={(e) => handleActivate(row.id, true)}>
                                  <Star />
                                </IconButton>
                              )
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
          count={openings.length}
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
export default FavoriteOpening
