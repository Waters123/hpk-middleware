import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect, Switch} from 'react-router-dom'

export function Logout() {
  return (
    <Switch>
      <Redirect to='/auth/login' />
    </Switch>
  )
}
