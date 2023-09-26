import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider} from '../_metronic/layout/core'
import {SnackbarProvider} from 'notistack'
import {Routes} from './routing/Routes'
import {AuthProvider} from './providers/AuthContext'

type Props = {
  basename: string
}

const App: React.FC<Props> = ({basename}) => {
  return (
    <BrowserRouter basename={basename}>
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
