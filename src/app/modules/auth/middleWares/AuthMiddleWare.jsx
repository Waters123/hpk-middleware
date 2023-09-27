import {useLocation, Redirect} from 'react-router-dom'
import {useAuth} from '../../../providers/AuthContext'

const RequireAuth = ({allowedRoles, children}) => {
  const user = useAuth()
  const location = useLocation()

  return user?.data?.role >= allowedRoles ? (
    children
  ) : user?.data ? (
    <h1>you are not authorized to do that</h1>
  ) : (
    <Redirect to='/auth/login' state={{from: location}} replace />
  )
}

export default RequireAuth
