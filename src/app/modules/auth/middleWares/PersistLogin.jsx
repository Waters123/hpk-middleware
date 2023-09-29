import {useState, useEffect} from 'react'
import {useAuth} from '../../../providers/AuthContext'
import useRefreshToken from '../../../hooks/useRefreshToken'

const PersistLogin = ({children}) => {
  const [loading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const user = useAuth()

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.log(error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (isMounted && !user?.data?.token) {
      verifyRefreshToken()
    }

    return () => {
      isMounted = false
    }
  }, [user?.data?.userName])

  return <div>{loading && !user?.data?.token ? null : children}</div>
}

export default PersistLogin
