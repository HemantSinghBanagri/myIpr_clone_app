import React from 'react'
import { UserAuth } from '../context/authcontext';
import { Navigate } from 'react-router-dom'

const RequiredAuth = ({children}) => {


    const {user,loading}=UserAuth()
    console.log(user)

    if (loading) {
        
        return <div>Loading...</div>;
      }
    if(!user){
         return <Navigate to="/"/>
    }
    
    return children

}

export default RequiredAuth
