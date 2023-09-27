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
  const [page, setPage] = useState(queryParams.get('page') || 1)
  const [rowsPerPage, setRowsPerPage] = useState(queryParams.get('limit') || 5)
  const [filters, setFilters] = useState({
    page: page,
    limit: rowsPerPage,
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
    history.push(`?${queryFilter(filters)}`)
  }, [filters, history.location.search, history])

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
        rows={data?.products}
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
