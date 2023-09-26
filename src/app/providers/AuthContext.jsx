import {createContext, useState, useContext} from 'react'

const AuthContext = createContext({})

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState()

  return <AuthContext.Provider value={{data: auth, setAuth}}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}
