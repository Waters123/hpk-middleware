import React from 'react'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Checkbox from '@mui/material/Checkbox'
import {visuallyHidden} from '@mui/utils'
import {Data, HeadCell} from '../products.types'

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

export default function EnhancedTableHead(props: EnhancedTableProps) {
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
