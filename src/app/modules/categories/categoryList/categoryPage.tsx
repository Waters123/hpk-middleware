import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import Button from '@mui/material/Button'
import {useFetch} from '../../../hooks/useFetch'
import {useState} from 'react'
import {CategoryList} from './components/categoryList'
import AddIcon from '@mui/icons-material/Add'
import {useHistory, useLocation} from 'react-router-dom'
import {CategoryData} from '../category.types'

import './categoryPage.css'
import {useLazyFetch} from '../../../hooks/useLazyFetch'

const ProductsBreadCrumb: Array<PageLink> = [
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

const CategoryPage: React.FC = () => {
  const [forceUpdate, update] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const {loading, data}: CategoryData = useFetch(`api/category/getall`, 'get', null, forceUpdate)
  const [deleteOne] = useLazyFetch()

  const HandleDeleteOne = (id) => {
    deleteOne(`api/category/deleteCategory/${id}`, 'delete').then(({snackBar}: any) => {
      update(!forceUpdate)
      snackBar()
    })
  }
  return (
    <>
      <PageTitle breadcrumbs={ProductsBreadCrumb}>კატეგორიები</PageTitle>
      <Button
        variant='contained'
        disableElevation
        onClick={() => history.push(`${location.pathname}/add`)}
        startIcon={<AddIcon />}
      >
        ახალი კატეგორია
      </Button>
      <div className='row' id='categories-list' style={{marginTop: 10}}>
        <CategoryList HandleDeleteOne={HandleDeleteOne} loading={loading} categories={data} />
      </div>
    </>
  )
}

export default CategoryPage
