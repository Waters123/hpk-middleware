import React from 'react'
import {alpha} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import {visuallyHidden} from '@mui/utils'
import CircularProgress from '@mui/material/CircularProgress'
import {Data, HeadCell, IMaterialTable} from '../products.types'
import {useLocation} from 'react-router-dom'

const headCells: readonly HeadCell[] = [
  {
    _id: '_id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
    sortable: true,
  },
  {
    _id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'price',
    sortable: true,
  },
  {
    _id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)',
    sortable: true,
  },
  {
    _id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
    sortable: true,
  },
  {
    _id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
    sortable: true,
  },
  {
    _id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'actions',
    sortable: false,
  },
]

type Order = 'asc' | 'desc'

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) =>
          headCell.sortable ? (
            <TableCell
              key={headCell._id}
              align='left'
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell._id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell._id}
                direction={orderBy === headCell._id ? order : 'asc'}
                onClick={createSortHandler(headCell._id)}
              >
                {headCell.label}
                {orderBy === headCell._id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell key={headCell._id} align='left'>
              {headCell.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  )
}

interface EnhancedTableToolbarProps {
  numSelected: number
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {numSelected} = props

  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1},
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{flex: '1 1 100%'}} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{flex: '1 1 100%'}} variant='h6' id='tableTitle' component='div'>
          პროდუქტები
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
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
        {loading ? (
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <CircularProgress />
          </Box>
        ) : (
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
                  {rows &&
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
                    })}
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
        )}
      </Paper>
    </Box>
  )
}
