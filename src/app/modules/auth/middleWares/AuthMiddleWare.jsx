import {useLocation, Redirect, Outlet} from 'react-router-dom'
import {useAuth} from '../../../providers/AuthContext'

const RequireAuth = ({allowedRoles, children}) => {
  const user = useAuth()
  const location = useLocation()

  return user?.data?.role >= allowedRoles ? (
    children
  ) : user?.data ? (
    <Redirect to='/unauthorized' state={{from: location}} replace />
  ) : (
    <Redirect to='/auth/login' state={{from: location}} replace />
  )
}

export default RequireAuth
