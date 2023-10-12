import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from '../../../../api/axios'
import {CircularProgress} from '@mui/material'

export const VerifyUser = () => {
  const [loading, setloading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const params = useParams()
  useEffect(() => {
    ;(async () => {
      setloading(true)
      try {
        const res = await axios.get(`/api/user/verify-user/${params.id}`)
        setloading(false)
      } catch (err) {
        console.log(err)
        setloading(false)
        setHasError(true)
      }
    })()
  }, [params])

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && hasError && (
        <p className='text-danger h6 text-center'>ვერიფიკაციის ბმულს ვადა გაუვიდა</p>
      )}
      {!loading && !hasError && (
        <span className='text-success h6 text-center'>
          თქვენ წარმატებით გაიარეთ ვერიფიკაცია <Link to='/'>მთავარი გვერდი</Link>
        </span>
      )}
    </>
  )
}
