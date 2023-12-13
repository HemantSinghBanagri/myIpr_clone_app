import React from 'react'
import SlidebarComponent from './slidedbarComponent/SlidebarComponent'

import HomeIcon from '@mui/icons-material/Home';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SmsIcon from '@mui/icons-material/Sms';
import "./slidebar.scss"
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';




const Sidebar = ({credit}) => {
 

  let slidedata=[
    {
      svg:<HomeIcon/>,
      name:"Home",
      link:"/home"

    },
    {
      svg:<CardMembershipIcon/>,
      name:"Certificate",
      link:"/certificate"

    },
    {
      svg:<SmsIcon/>,
      name:"Request",
      link:"/request/receive"

    },
    // {
    //   svg:<MarkAsUnreadIcon/>,
    //   name:"Received",
    //   link:"/receive-transfer-requests"

    // },
   
    
  ]


  return (
    
        <div className='navbar-component navbar-hidden' >
        <div  className='path-wrap'>
        <SlidebarComponent slidedata={slidedata}></SlidebarComponent>
          
          <div className='bottom-wrap'>
            <div className='balance-wrap'>
              <img src='https://dev-myipr.p2eppl.com/static/media/creditIcon.ae7e1015bdf1a8dd8aff.webp' alt="coin" width="20" height="20"></img>
              <span>Credits:{credit}</span>
            </div>
            <Link to="/help" >
              <div className='help-support'>
                <InfoIcon/>
                <span>Help Support</span>
              </div>


            </Link>


          </div>
        </div>

        </div>
            
       
  )
}

export default Sidebar
