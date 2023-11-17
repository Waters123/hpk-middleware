import React, {useEffect, useState} from 'react'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {useFetch} from '../../../hooks/useFetch'
import {useLazyFetch} from '../../../hooks/useLazyFetch'
import {queryFilter} from '../../../utils/generateQueryString'
import {useHistory, useLocation} from 'react-router-dom'
import EditCategory from './editCategory'
import {useParams} from 'react-router-dom'

const CategoryBreadCrumb: Array<PageLink> = [
  {
    title: 'კატეგორიები',
    path: '/products/categories',
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

const EditCategoryPage: React.FC = () => {
  const location = useLocation()
  const [forceUpdate, update] = useState(false)
  const {id}: any = useParams()

  const {loading, data}: any = useFetch(
    `api/category/getSingleCategory/${id}`,
    'get',
    null,
    forceUpdate
  )

  return (
    <>
      <PageTitle breadcrumbs={CategoryBreadCrumb}>კატეგორიის რედაქტირება</PageTitle>
      {!loading && <EditCategory singleCategory={data} />}
    </>
  )
}

export default EditCategoryPage
