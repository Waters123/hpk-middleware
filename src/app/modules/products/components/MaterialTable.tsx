import React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import EnhancedTableHead from './EnhancedTablesHead'
import {Data, IMaterialTable} from '../products.types'
import {useLocation} from 'react-router-dom'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import {Skeleton} from '@mui/material'

type Order = 'asc' | 'desc'

const TableRowsLoader = ({rowsNum}: any) => {
  return (
    <>
      {[...Array(+rowsNum)].map((row, index) => (
        <TableRow key={index}>
          <TableCell component='th' scope='row'>
            <Skeleton animation='wave' variant='text' />
          </TableCell>
          <TableCell style={{width: 400}}>
            <Skeleton animation='wave' variant='text' />
          </TableCell>
          <TableCell>
            <Skeleton animation='wave' variant='text' />
          </TableCell>
          <TableCell>
            <Skeleton animation='wave' variant='text' />
          </TableCell>
          <TableCell>
            <Skeleton animation='wave' variant='text' />
          </TableCell>
          <TableCell>
            <Skeleton animation='wave' variant='text' />
          </TableCell>
          <TableCell>
            <Skeleton animation='wave' variant='text' />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default function MaterialTable({
  rows,
  loading,
  HandleDeleteOne,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  totalCount,
  onFilter,
}: IMaterialTable) {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const sortParam = queryParams.get('sort')
  const initialOrder = sortParam && sortParam[0] === '-' ? 'desc' : 'asc'
  const [order, setOrder] = React.useState<Order>(initialOrder)
  const [orderBy, setOrderBy] = React.useState<keyof Data>(
    (sortParam?.substring(1) as keyof Data) || 'price'
  )
  const [selected, setSelected] = React.useState<readonly string[]>([])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    onFilter({sort: `${isAsc ? '-' : '+'}${property}`})
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id)
      setSelected(newSelected)
      return
    }

    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, _id: string) => {
    const selectedIndex = selected.indexOf(_id)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
    onFilter({page: newPage + 1})
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    onFilter({limit: parseInt(event.target.value, 10)})
    setPage(1)
  }

  const isSelected = (_id: string) => selected.indexOf(_id) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 1 ? Math.max(0, (page - 1) * rowsPerPage - totalCount) : 0

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table sx={{minWidth: 750}} aria-labelledby='tableTitle'>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
              />
              <TableBody>
                {loading ? (
                  <TableRowsLoader rowsNum={rowsPerPage} />
                ) : (
                  rows &&
                  rows.map((row, index) => {
                    const isItemSelected = isSelected(row._id)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{cursor: 'pointer'}}
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            onClick={(event) => handleClick(event, row._id)}
                            color='primary'
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell component='th' id={labelId} align='left'>
                          {row._id}
                        </TableCell>
                        <TableCell align='left'>{row.price}</TableCell>
                        <TableCell align='left'>{row.fat}</TableCell>
                        <TableCell align='left'>{row.carbs}</TableCell>
                        <TableCell align='left'>{row.protein}</TableCell>
                        <TableCell align='left'>
                          <button onClick={() => HandleDeleteOne(row._id)}>click</button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={totalCount || 0}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      </Paper>
    </Box>
  )
}
