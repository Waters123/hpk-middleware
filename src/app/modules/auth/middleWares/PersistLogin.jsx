import {useState, useEffect} from 'react'
import {useAuth} from '../../../providers/AuthContext'
import useRefreshToken from '../../../hooks/useRefreshToken'

const PersistLogin = ({children}) => {
  const [loading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const user = useAuth()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    !user?.data?.token && verifyRefreshToken()
  }, [user?.data?.userName])

  return <div>{loading && !user?.data?.token ? null : children}</div>
}

export default PersistLogin
