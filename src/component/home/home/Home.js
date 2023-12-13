import React, { useEffect, useState } from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import "./home.scss"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import Dropdown from './dropdown';
import Sidebar from './sidebar/Sidebar';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { firestore,collection,getDocs,query,where } from '../../../firebase/firebase';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import { UserAuth } from '../../../context/authcontext';

import { useNavigate } from 'react-router-dom';



const Home = () => {
  
  const [isOpen,setIsopen]=useState(false)
  const [certificates,setCertificates]=useState([])
  const { user } = UserAuth();
  // const [selectedCertificateDetails,setSelectedCertificateDetails]=useState(null)
  const [credit]=useState(10)

  // const [issidebaropen,setIssidebarOpen]=useState(false)


  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate('/adding_certificate');
  };

  const dropdownhandler=()=>(
    setIsopen(!isOpen)

  )
 


  const clickcertificateHandler = (certificate) => {
    localStorage.setItem('certificateDetails', JSON.stringify(certificate));
    navigate('/CertificateDetails');
  };
  // const sidebarHandler=()=>{
  //   setIssidebarOpen(!issidebaropen)
  // }

  useEffect(()=>{
    const fetchCettificates=async()=>{
      const certificateCollection=collection(firestore,"certificates");
      const certificateShapshot=await getDocs(query(
        certificateCollection,
        
        where('email', '==', user.email)
      ))
      const certificateData=certificateShapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
      setCertificates(certificateData)
    }
    fetchCettificates()
  },[user])
  



 
  return (
  


  <>
    <div className='parent-container '>
    
    
    <div className='header-container'>



      {/* <MenuIcon onClick={sidebarHandler} className='menu'/> */}
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
    <span>Credits: {credit}</span>
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
    

    <div className='main-body'>
   {/* {issidebaropen &&  <Sidebar className="sidebar"/>} */}
   <Sidebar credit={credit}/>
    
    <div className='outlet-container'>
    <div className='main-home-container'>
    <div>

      <h2>Home</h2>
    </div>
    <div className='create-certificate'>
      <h4>Learn How to create a certificate</h4>
      <div className='su-create-certificate'>
        <div className='row'>
          <div className='row-class'>
            <ContactEmergencyIcon/>
            <h5 className='verify-heading'>Verify yourself</h5>
            <p className='verify-para'>
            Lock in your identity by completing 
            <br/>
            your KYC and you are ready to go!
            </p>

          </div>
          <div className='row-class'>
            <CloudUploadIcon/>
            <h5 className='verify-heading'>Verify yourself</h5>
            <p className='verify-para'>
            Lock in your identity by completing 
            <br/>
            your KYC and you are ready to go!
            </p>

          </div>
          <div className='row-class'>
            <VerifiedUserIcon/>
            <h5 className='verify-heading'>Get certified</h5>
            <p className='verify-para'>
            Voila! Your IP has been registered and
            <br/>
you have a certificate to prove it.
            </p>

          </div>
        </div>
        <div className='create-button'>
        <div className='button-wrapper-home'>
          <button onClick={navigationHandler}   className='main-button-home' >Certificate</button>
        </div>

        </div>
      </div>
    
    </div>

    <div className='certificate-outlet'>
    <div>
      <h1>Recent Certificates</h1>
    </div>
    <div className='certificate-cards'>
                {certificates.map((certificate) => (

                  <div key={certificate.id} className='certificate-card' onClick={()=>clickcertificateHandler(certificate)}>
                  <p>{certificate.filename}</p>
                  {certificate.image ? (
        <img src={certificate.image} alt={certificate.filename} />
      ) : (
        <BrokenImageOutlinedIcon  className='image-svg' / >
      )}  <h4>Complete</h4>
                    <p><span>Create by : </span>{certificate.Createby}</p>
                    <span>{certificate.dateIssued}</span>
                  </div>
                ))}
                </div>
              </div>
    </div>
    
      
      
    </div>
      
    </div>
    
      
    </div>
    
    
   
  
        </>
   
  )
}

export default Home
