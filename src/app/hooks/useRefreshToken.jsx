import axios from '../api/axios'
import {useAuth} from '../providers/AuthContext'

const useRefreshToken = () => {
  const user = useAuth()

  const refresh = async () => {
    try {
      const response = await axios.get('/api/user/refreshtoken', {
        withCredentials: true,
      })
      if (!user.data) {
        user.setAuth({...response.data})
      } else {
        user.setAuth((prev) => {
          return {...prev, token: response.data.accessToken}
        })
      }

      return response.data.accessToken
    } catch (err) {
      console.log(err)
    }
  }

  return refresh
}

export default useRefreshToken
