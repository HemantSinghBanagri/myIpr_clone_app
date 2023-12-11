import React  from 'react'
import { UserAuth } from '../../../context/authcontext';
import "./dropdown.scss"
import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LogOutDropdown from './LogOutDropdown';
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const Dropdown = () => {

 
  // const [isOpenlogout,setIsopneLogOut]=useState(false)
  // const logoutdropdownhandler=()=>(
  //   setIsopneLogOut(!isOpenlogout)


  // )
  // const cancleLogout=()=>{
  //   setIsopneLogOut(!isOpenlogout)
  // }
    const {user}=UserAuth()





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
    <>
    
    <div className='dropdown-menu' >
    <div className='first-child'>
    <p>{user && user.email}</p>

    </div>
    <div className='second-child'>
        <p><SettingsIcon/> <span>Setting</span></p>
        <p ><IoLogOut  className='Log-Out'/><button className="logout-dropdown-functon" onClick={handlelogout}>logout</button></p>
    </div>    
    </div>
    {/* <div className="logout-container">
    {isOpenlogout && <LogOutDropdown  cancleLogout={cancleLogout}/> }

    </div> */}
    </>
  )
}

export default Dropdown
