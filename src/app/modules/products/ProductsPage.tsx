import React, {useEffect, useState} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import MaterialTable from './components/MaterialTable'
import {Data, Response} from './products.types'
import {useFetch} from '../../hooks/useFetch'
import {useLazyFetch} from '../../hooks/useLazyFetch'

import {queryFilter} from '../../utils/generateQueryString'
import {useHistory, useLocation} from 'react-router-dom'

const ProductsBreadCrumb: Array<PageLink> = [
  {
    title: 'პროდუქტი',
    path: '/products/pages/add',
    isSeparator: false,
    isActive: true,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: true,
  },
]

const ProductsPage: React.FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [forceUpdate, update] = useState(false)
  const [rows, setRows] = useState<Data[]>([])
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filters, setFilters] = useState({
    page: queryParams.get('page') || page,
    limit: queryParams.get('rows') || rowsPerPage,
    sort: queryParams.get('sort'),
  })
  const history = useHistory()

  const [deleteOne] = useLazyFetch()

  const {loading, data}: Response = useFetch(
    `api/product/getall?${queryFilter(filters)}`,
    'get',
    null,
    forceUpdate
  )

  useEffect(() => {
    setRows(data?.products)
  }, [data])

  useEffect(() => {
    history.push(`?${queryFilter(filters)}`)
  }, [filters, history])

  const HandleDeleteOne = async (id: string) => {
    deleteOne(`api/product/deleteProduct/${id}`, 'get').then(({snackBar}: any) => {
      update(!forceUpdate)
      snackBar()
    })
  }

  return (
    <>
      <PageTitle breadcrumbs={ProductsBreadCrumb}>ყველა პროდუქტი</PageTitle>
      <MaterialTable
        loading={loading}
        rows={rows}
        HandleDeleteOne={HandleDeleteOne}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalCount={data?.totalProductsCount || 0}
        onFilter={(newfilters: any) => setFilters((prev) => ({...prev, ...newfilters}))}
      />
    </>
  )
}

export default ProductsPage
