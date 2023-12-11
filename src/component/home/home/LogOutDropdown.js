import React from 'react'
import { UserAuth } from '../../../context/authcontext';
import { useNavigate } from 'react-router-dom';
import "./logoutdropdown.scss"

const LogOutDropdown = ({cancleLogout}) => {
    const {logoutUser}=UserAuth()
    
    const navigate=useNavigate()
    const handlelogout=async()=>{
        try{
          await logoutUser()
          navigate('/')
          console.log('u r logout')
    
        }catch(e){
          console.error(e.message)
    
        }
      }
  return (
    <div >
    <div>
        <span>Log Out</span>
        <div>
            <p>Arr you sure you want to <strong>Log Out ?</strong></p>
            <div>
                <button onClick={cancleLogout}>Cancle</button><button onClick={handlelogout}>Log Out</button>
            </div>
        </div>
    </div>
      
    </div>
  )
}

export default LogOutDropdown
