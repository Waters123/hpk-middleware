import React from 'react'
import {AsideDefault} from './components/aside/AsideDefault'

import {HeaderWrapper} from './components/header/HeaderWrapper'
import {Toolbar} from './components/toolbar/Toolbar'
import {Content} from './components/Content'
import {PageDataProvider} from './core'

const MasterLayout: React.FC = ({children}) => {
  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper />

          <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
            <Toolbar />
            <div className='post d-flex flex-column-fluid' id='kt_post'>
              <Content>{children}</Content>
            </div>
          </div>
        </div>
      </div>

      {/* begin:: Drawers */}
      {/* end:: Drawers */}

      {/* begin:: Modals */}

      {/* end:: Modals */}
    </PageDataProvider>
  )
}

export {MasterLayout}
