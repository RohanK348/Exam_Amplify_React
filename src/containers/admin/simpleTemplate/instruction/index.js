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

import {useTemplate} from '../../../../provider/template'
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

const Instruction = () => {
  const [template] = useTemplate()
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [instructions, setInstructions] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    if (template?.instructions) {
      setInstructions(template?.instructions)
    }
  }, [template?.instructions])
  return (
    <>
      <Widget
        title="Instructions"
        description={
          <span>
            Here are Instructions
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
              {instructions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
          count={instructions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Widget>
    </>
  )
}
export default Instruction
