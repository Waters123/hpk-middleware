import React from 'react'
import {Account} from './components/account/Account'
import {Route, Switch} from 'react-router-dom'
import {ProfileHeader} from './ProfileHeader'

const ProfilePage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path='/user/settings' component={Account} />
        <Route path='/user' component={ProfileHeader} />
      </Switch>
    </>
  )
}

export default ProfilePage
