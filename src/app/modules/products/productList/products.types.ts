export interface Data {
  price: number
  carbs: number
  fat: number
  _id: string
  protein: number
  actions?: string
}

export interface Response {
  loading: boolean
  data: {
    totalProductsCount: number | undefined
    products: Array<Data>
  }
}

export interface HeadCell {
  disablePadding: boolean
  _id: keyof Data
  label: string
  numeric: boolean
  sortable: boolean
}

export interface IMaterialTable {
  loading: boolean
  rows: Data[]
  HandleDeleteOne: (id: string) => Promise<void>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number | string>>
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number | string>>
  totalCount: number
  onFilter: React.Dispatch<React.SetStateAction<any>>
}
