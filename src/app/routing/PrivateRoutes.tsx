import {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'

export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProductsPage = lazy(() => import('../modules/products/ProductsPage'))
  const DashboardWrapper = lazy(() => import('../pages/dashboard/DashboardWrapper'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/products/pages/allProducts' component={ProductsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />

        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
