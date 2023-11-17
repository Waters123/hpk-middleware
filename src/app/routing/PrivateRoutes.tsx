import {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import ProfilePage from '../modules/profile/ProfilePage'
import EditCategoryPage from '../modules/categories/editCategory/editCategoryPage'

export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProductsPage = lazy(() => import('../modules/products/productList/ProductsPage'))
  const CategoryPage = lazy(() => import('../modules/categories/categoryList/categoryPage'))

  const AddCategory = lazy(() => import('../modules/categories/addCategory/addCategory'))
  const DashboardWrapper = lazy(() => import('../pages/dashboard/DashboardWrapper'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/products/allProducts' component={ProductsPage} />
        <Route path='/products/categories/add' component={AddCategory} />
        <Route path='/products/categories/edit/:id' component={EditCategoryPage} />
        <Route path='/products/categories' component={CategoryPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />

        {/* user */}
        <Route path='/user' component={ProfilePage} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
