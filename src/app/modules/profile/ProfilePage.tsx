import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {TablesWidget12} from '../../../_metronic/partials/widgets'

const profileBreadCrumbs: Array<PageLink> = [
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

const ProfilePage: React.FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={profileBreadCrumbs}>ყველა პროდუქტი</PageTitle>
      <TablesWidget12 className='mb-5 mb-xl-8' />
    </>
  )
}

export default ProfilePage
