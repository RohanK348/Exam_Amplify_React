import React, {useState, useEffect} from 'react'
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
} from '@material-ui/core'

import {useQuestion} from '../../../../provider/question'
import Widget from '../../../../components/widget'
import {useStyles} from '../../../style/common'
import Create from './create'
import Edit from './edit'
import Delete from './delete'

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]

const Tag = () => {
  const [question] = useQuestion()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [tags, setTags] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    if (question?.tags) {
      setTags(question?.tags)
    }
  }, [question?.tags])
  return (
    <>
      <Widget
        title="Tag"
        description={
          <span>
            Here are Tags
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
              {tags.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
          count={tags.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Widget>
    </>
  )
}
export default Tag
