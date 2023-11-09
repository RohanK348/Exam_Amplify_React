import React from 'react'
import {useTable, useSortBy, usePagination, useRowSelect} from 'react-table'
import {PageWithText} from '../pagination'

const IndeterminateCheckbox = React.forwardRef(
  ({indeterminate, ...rest}, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <input
        type="checkbox"
        ref={resolvedRef}
        {...rest}
        className="form-checkbox h-4 w-4"
      />
    )
  }
)

const Datatable = ({columns, data}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    pageOptions,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize}
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex: 0, pageSize: 25}
    },
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({getToggleAllRowsSelectedProps}) => (
            <>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({row}) => (
            <>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </>
          )
        },
        ...columns
      ])
    }
  )

  // Render the UI for your table
  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="text-sm font-light text-grey-500">Inbox</div>
          <div className="text-sm font-bold">5 new messages</div>
        </div>

        <div className="text-grey-500">
          {pageIndex * pageSize} - {(pageIndex + 1) * pageSize} of{' '}
          {pageOptions.length * pageSize}
        </div>

      </div>

      <table {...getTableProps()} className="table">
        <thead className="hidden">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="flex flex-row items-center justify-start">
                    <span>{column.render('Header')}</span>
                    {/* Add a sort direction indicator */}
                    <span className="ml-auto">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <icon className="icon-arrow-down text-2xs" />
                        ) : (
                          <icon className="icon-arrow-up text-2xs" />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="flex flex-row items-center justify-between space-x-2 my-2">
        <div className="flex flex-wrap items-center justify-start space-x-2 pagination">
          {canPreviousPage && (
            <PageWithText
              onClick={() => previousPage()}
              color="bg-grey-500 hover:bg-grey-600 text-white">
              Previous
            </PageWithText>
          )}
          {canNextPage && (
            <PageWithText
              onClick={() => nextPage()}
              disabled={!canNextPage}
              color="bg-grey-500 hover:bg-grey-600 text-white">
              Next
            </PageWithText>
          )}
        </div>

        <select
          className="form-select text-sm"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}>
          {[10, 25, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Datatable
