import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider} from '../_metronic/layout/core'
import {SnackbarProvider} from 'notistack'
import {Routes} from './routing/Routes'
import {AuthProvider} from './providers/AuthContext'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {ScrollTop} from '../_metronic/layout/components/ScrollTop'

type Props = {
  basename: string
}

const App: React.FC<Props> = ({basename}) => {
  console.log(process.env.REACT_APP_API_URL)
  return (
    <BrowserRouter basename={basename}>
      <MasterInit />
      <ScrollTop />
      <I18nProvider>
        <AuthProvider>
          <LayoutProvider>
            <SnackbarProvider maxSnack={3} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
              <Routes />
            </SnackbarProvider>
          </LayoutProvider>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  )
}

export {App}
