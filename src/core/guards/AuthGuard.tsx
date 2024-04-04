import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthGuard:React.FC<any> = ({ children }) => {
 const navigate = useNavigate()
 let token  = localStorage.getItem('authToken') ? true : false
 useEffect(()=>{
  if (!token) {
   return navigate('/login')
  }
 },[])

 return children
}

export default AuthGuard;