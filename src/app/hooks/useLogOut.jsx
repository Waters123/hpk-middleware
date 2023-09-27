import {useHistory} from 'react-router-dom'
import axios from '../api/axios'
import {useAuth} from '../providers/AuthContext'

const useLogout = () => {
  const {setAuth} = useAuth()
  const history = useHistory()
  const logout = async () => {
    setAuth(null)
    try {
      const response = await axios('/api/user/logout', {
        withCredentials: true,
      })

      const data = await response
      history.push('/auth/login')
    } catch (err) {
      console.error(err)
      history.push('/auth/login')
    }
  }

  return logout
}

export default useLogout
