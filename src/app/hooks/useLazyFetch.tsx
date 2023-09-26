import {useReducer, useCallback} from 'react'
import {useAxiosPrivate} from '../api/axios' // Import AxiosResponse if not already imported
import {useSnackbar} from 'notistack'

// Define a type for the response data
interface ResponseData {
  // Define the structure of your response data here
}

interface LazyFetchState {
  data: ResponseData | null
  loading: boolean
  error: any | null // You may want to specify a more specific error type
  status: number | null
}

// Define an enum for action types to ensure type safety
enum ActionTypes {
  SetData = 'setData',
  SetError = 'setError',
  SetLoading = 'setLoading',
  SetStatus = 'setStatus',
}

type LazyFetchAction =
  | {type: ActionTypes.SetData; data: ResponseData}
  | {type: ActionTypes.SetError; error: any}
  | {type: ActionTypes.SetLoading; loading: boolean}
  | {type: ActionTypes.SetStatus; status: number | null}

const initialState: LazyFetchState = {
  data: null,
  loading: false,
  error: null,
  status: null,
}

const reducer = (state: LazyFetchState, action: LazyFetchAction): LazyFetchState => {
  switch (action.type) {
    case ActionTypes.SetData:
      return {...state, loading: false, data: action.data}
    case ActionTypes.SetError:
      return {...state, loading: false, data: null, error: action.error}
    case ActionTypes.SetLoading:
      return {...state, loading: action.loading}
    case ActionTypes.SetStatus:
      return {...state, status: action.status}
    default:
      return state
  }
}

export function useLazyFetch() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const axios = useAxiosPrivate()
  const {enqueueSnackbar} = useSnackbar()

  const fetcher = useCallback(
    (endpoint: string, method: string, body?: any): Promise<ResponseData | null> =>
      new Promise(async (resolve) => {
        dispatch({type: ActionTypes.SetLoading, loading: true})

        try {
          let response: any

          if (method === 'get') {
            response = await axios.get(endpoint)
          } else if (method === 'post') {
            response = await axios.post(endpoint, body)
          } else if (method === 'put') {
            response = await axios.put(endpoint, body)
          } else if (method === 'delete') {
            response = await axios.delete(endpoint)
          } else {
            // Handle unsupported methods or throw an error
            throw new Error(`Unsupported HTTP method: ${method}`)
          }

          const data: ResponseData = await response.data

          dispatch({type: ActionTypes.SetData, data})
          const snackBar = () =>
            enqueueSnackbar('Successful', {
              variant: 'success',
            })

          resolve({data, snackBar})
        } catch (error) {
          dispatch({type: ActionTypes.SetError, error})
          enqueueSnackbar('Error', {
            variant: 'error',
          })
          return null // Handle errors appropriately based on your application logic
        }
      }),

    [enqueueSnackbar, axios]
  )

  return [
    fetcher,
    {
      response: state.data,
      loading: state.loading,
      error: state.error,
      status: state.status,
    },
  ] as const // Use const assertion to preserve the specific tuple type
}
