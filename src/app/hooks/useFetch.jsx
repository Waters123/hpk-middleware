import {useEffect, useReducer, useRef} from 'react'
import {useAxiosPrivate} from '../api/axios'
import {useSnackbar} from 'notistack'
const initialState = {
  data: null,
  loading: false,
  error: null,
  status: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setData':
      return {...state, loading: false, data: action.data}
    case 'setError':
      return {...state, loading: false, data: null, error: action.error}
    case 'setLoading':
      return {...state, loading: action.loading}
    case 'setStatus':
      return {...state, status: action.status}
    default:
      return state
  }
}

export function useFetch(endpoint, method, options = null, forceUodate = false) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const axios = useAxiosPrivate()
  const {enqueueSnackbar} = useSnackbar()
  const controller = new AbortController()
  const _isMounted = useRef(false)

  useEffect(() => {
    _isMounted.current = true
    ;(async () => {
      dispatch({type: 'setLoading', loading: true})

      try {
        const response = await axios[method](endpoint, {...options, signal: controller.signal})

        if (_isMounted.current) {
          dispatch({type: 'setStatus', status: response.status})

          const data = await response.data

          dispatch({type: 'setData', data})
        }
      } catch (error) {
        dispatch({type: 'setError', error})
      }
    })()
    return () => {
      _isMounted.current = false
      controller.abort()
    }
  }, [endpoint, options, method, enqueueSnackbar, axios, forceUodate])

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    status: state.status,
  }
}
