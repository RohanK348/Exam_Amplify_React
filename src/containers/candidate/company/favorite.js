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

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {getFilter as getFavorites, add as addFavorite, remove as removeFavorite, getCorporatesByPa as getCorporates} from '../../../api/favoriteCorporate'
import {useAsync} from '../../../functions/utils'
// import {sleep} from '../../../functions/common'
import {useSetting} from '../../../provider/setting'
import AmplifyImage from '../../../components/amplifyImage'

const columns = [
  { id: 'company', label: 'Company', minWidth: 200 },
  { id: 'openingNumber', label: 'Opening', minWidth: 100, align: 'center' },
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

const FavoriteCompany = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [limit, setLimit] = useState(10)
  const [companies, setCompanies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleActivate = (corporateId, activate) => {
    if (activate) {
      run(addFavorite(setting.auth.id, corporateId))
      setAsyncState('addFavorite')
    }
    else {
      run(removeFavorite(setting.auth.id, corporateId))
      setAsyncState('removeFavorite')
    }
  }
  const loadMore = () => {
    run(getCorporates({userID: {eq: setting.auth.id}}, limit, from))
    setAsyncState('getCorporates')
    setFrom(from+limit)
    setPending(true)
  }

  useEffect(() => {
    if (setting.auth) {
      run(getFavorites({userID: {eq: setting.auth.id}}))
      setAsyncState('getFavorites')
      setPending(true)
    }
  }, [run, setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getFavorites') {
        let tmp = data.map((item) => item.corporateID)
        setFavorites(tmp)
        setCompanies([])
        setFrom(limit)
        run(getCorporates({userID: {eq: setting.auth.id}}, limit, 0))
        setAsyncState('getCorporates')
      }
      else if (asyncState === 'getCorporates') {
        setCompanies([...companies, ...data])
        setPending(false)
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
      <SectionTitle title="Favorite Company" subtitle="Favorite Company" />
      <Widget
        title="Favorite Company"
        description={
          <span>
            Here are favorite companies
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
                              <Link to={`/company/detail/${row.id}`} style={{textDecoration: 'none'}}>
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
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button style={{marginTop: 10}} variant="outlined" onClick={loadMore}>View More</Button>
        </div>
      </Widget>
    </>
  )
}
export default FavoriteCompany
