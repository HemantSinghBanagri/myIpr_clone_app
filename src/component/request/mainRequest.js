import React from 'react'


import { useState } from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import "../home/home/home.scss"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RequestTransfer from '../RequestTransfer/RequestTransfer';

import Dropdown from '../home/home/dropdown';
import Sidebar from '../home/home/sidebar/Sidebar';
import TransferRequests from '../TransferRequest/TransferRequest';


const MainRequest = () => {
    const [isOpen,setIsopen]=useState(false)
  

    const dropdownhandler=()=>(
      setIsopen(!isOpen)
  
    )
  
    
    
  
  
  
   
    return (
    
  
  
    <>
      <div className='parent-container '>
      
      
      <div className='header-container'>
  
  
  
      
        <div className='header-wrapper'>
        
            <div className='ham-wapper'>
              <a href='/home'>
                <img src="https://qa-myipr.p2eppl.com/static/media/ipr-logo-blue.d36167428cb98359a56a.webp 
                        " alt='logo' className='myiprimage' width={160} >
  
                </img>
              </a>
            </div>
  
  
  
  
  
            <div className='side_component'>
        
                  <div className='credit-wrap'>
  
      <img src="https://qa-myipr.p2eppl.com/static/media/creditIcon.ae7e1015bdf1a8dd8aff.webp" alt="coin"></img>
      <span>Credits: 0</span>
                  </div>
  
  
  
                  <div className='notificaiton'>
          <div >
              <NotificationsNoneIcon/>
          </div>
                  </div>
  
  
                  <div className='profile-dropdown'>
        
                  <div className='differnet'>
            </div>
                  <div className='dropdown'>
                        <button className='dropdown-toggle'>
                          <div className='avater'>CC</div>
                          <KeyboardArrowDownIcon className="drop-svg" onClick={dropdownhandler}></KeyboardArrowDownIcon>
                          
                            
                          
                        </button>
                        {isOpen && <Dropdown/>}
                        
  
                   </div>
                  </div>
  
  
             </div>
  
  
  
  
  
  
  
        </div>
  
  
  
      
          
  
  
  
        
        
      </div>
      {/* <Certificate/> */}
      
  
      <div className='main-body'>
      <Sidebar/>
      <div className='outlet-container'>
      {/* <TransferRequests  /> */}
      <RequestTransfer/>
        
        
      </div>
        
      </div>
      
        
      </div>
      
      
     
    
          </>
     
    )
  }

export default MainRequest
