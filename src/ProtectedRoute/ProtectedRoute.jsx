import { Navigate } from 'react-router-dom'
import { userContext } from '../context/UserContext'
import  { useContext } from 'react'

const ProtectedRoute = ({children}) => {
const {token} = useContext(userContext)

    if(!token){
        return <Navigate  to='/login'/>
    } 

  return <>
  {children}
  </>
}

export default ProtectedRoute
