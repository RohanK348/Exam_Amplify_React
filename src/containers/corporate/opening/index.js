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
import {getByPagination as getOpenings} from '../../../api/opening'
import {useAsync} from '../../../functions/utils'
import {sleep} from '../../../functions/common'
import {useSetting} from '../../../provider/setting'
import {formatYmd} from '../../../functions/string'
import Delete from './delete'

const columns = [
  { id: 'expiredOn', label: 'Expired date', minWidth: 100, align: 'center' },
  { id: 'title', label: 'Title', minWidth: 150, align: 'center' },
  { id: '_vacancy', label: 'Vacancy', minWidth: 100, align: 'center' },
  { id: '_EAScore', label: 'EAScore', minWidth: 100, align: 'center' },
  { id: '_exam', label: 'Exam', minWidth: 100, align: 'center' },
  { id: 'candidate', label: 'Candidates Applied', minWidth: 100, align: 'center' },
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
                  <Link to={`/corporate/opening/edit/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Edit"
                    />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={`/corporate/opening/detail/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Detail"
                    />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={`/corporate/exam/create/${item.id}`} style={{textDecoration: 'none'}}>
                    <ListItemText
                      primary="Create Exam"
                    />
                  </Link>
                </ListItem>
                <ListItem>
                  <Delete item={item} refresh={refresh}>
                    <ListItemText
                      primary="Delete"
                      style={{color: '#E54C4C'}}
                    />
                  </Delete>
                </ListItem>
              </List>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

const Opening = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [from , setFrom] = useState(0)
  const [openings, setOpenings] = useState([])
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
    setOpenings([])
    setFrom(limit)
    run(getOpenings({corporateID: {eq: setting?.auth?.corporateID}}, limit, 0))
    setPending(true)
  }
  const loadMore = () => {
    run(getOpenings({corporateID: {eq: setting?.auth?.corporateID}}, limit, from))
    setFrom(from+limit)
    setPending(true)
  }

  useEffect(() => {
    if (setting.auth) {
      setOpenings([])
      setFrom(limit)
      console.log(setting?.auth?.corporateID)
      run(getOpenings({corporateID: {eq: setting?.auth?.corporateID}}, limit, 0))
      setPending(true)
    }
  }, [run, setting.auth])
  useEffect(() => {
    if (status === 'resolved') {
      let tmp = data.map((item) => {
        item.expiredOn = formatYmd(new Date(item.ExpiryDate));
        item._vacancy = item.vacancy.slice(0, 2).join(', ')
        if (item.vacancy.length > 2)
          item._vacancy = item._vacancy + '...'
        item._EAScore = item.EAScore.slice(0, 2).join(', ')
        if (item.EAScore.length > 2)
          item._EAScore = item._EAScore + '...'
        if (item.exam && item?.exam?.length !== 0)
          item._exam = "Yes"
        else
          item._exam = "No"
        return item
      })
      setOpenings([...openings, ...tmp])
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
      <SectionTitle title="Corporate" subtitle="Opening management" />
      <Widget
        title="Opening"
        description={
          <span>
            Here are openings
          </span>
        }>
        <Link to={`/corporate/opening/create`} style={{textDecoration: 'none'}}>
          <Button style={{float: 'right', marginBottom: 10}} variant="outlined">Create Opening</Button>
        </Link>
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
                              <>
                                <Action item={row} refresh={refresh} />
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
export default Opening
