import React from 'react'
import "./homepage.scss"
import Login from './login/Login'



const Homepage = () => {
  return (
    <div className='outer-container-login'>

    <div className='side-container'> 


        <a href='/login'>
        <img src='https://qa-myipr.p2eppl.com/static/media/ipr-scanner.b936b6af536155305b3356783c988784.svg' className='ui-scanner' alt="scanner"></img>
           
        </a>
        <div className='heading-container'>
        <p className='custom-heading'>
            <strong>Protect, </strong> <strong> manage</strong> and <strong>monetise</strong> your creation, <em>affordably</em> and <em>seamlessly</em>
        </p>
        <p className='custom-suheading'> 
            MyIPR provides end-to-end intellectual property management. Login today!
        </p>
        </div>
   
    

    </div>


    <div className='outlet-container-login'>
    <div className='login-container'>
    <img src='https://app.myipr.io/static/media/myIpr-green.63532adc5d970aad34f3.png' className='myipr-logo' alt='MyIPR'></img>


    <div className='cont-login'>
      <div>
        <p className='heading'> Welcome to MYIPR</p>
        <p className='link1'>

          "New to MyIPR ?"
          <span>
            <a href='/create'>Join now</a>
          </span>
        </p>
      </div>
      <Login/>

    </div>
    

    </div>

    </div>
      
    </div>
  )
}

export default Homepage
