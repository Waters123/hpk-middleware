import axios from 'axios'
import {useEffect} from 'react'
import {useAuth} from '../providers/AuthContext'
import useFresheshToken from '../hooks/useRefreshToken'

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
})

export const useAxiosPrivate = () => {
  const refresh = useFresheshToken()
  const user = useAuth().data

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = user?.token && `Bearer ${user?.token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newToken}`
          return axiosPrivate(prevRequest)
        } else {
          // Handle other types of errors or re-throw the original error
          throw error
        }
      }
    )
    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept)
      axiosPrivate.interceptors.response.eject(requestIntercept)
    }
  }, [user, refresh])

  return axiosPrivate
}
