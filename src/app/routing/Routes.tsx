/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {FC} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import PersistLogin from '../modules/auth/middleWares/PersistLogin'
import RequireAuth from '../modules/auth/middleWares/AuthMiddleWare'

const ROLES = {
  User: 156,
  Editor: 289,
  Admin: 578,
}

const Routes: FC = () => {
  return (
    <Switch>
      <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />
      <Route path='/auth' component={AuthPage} />

      <Route>
        <PersistLogin>
          <MasterLayout>
            <RequireAuth allowedRoles={ROLES.Admin}>
              <PrivateRoutes />
            </RequireAuth>
          </MasterLayout>
        </PersistLogin>
      </Route>
    </Switch>
  )
}

export {Routes}
