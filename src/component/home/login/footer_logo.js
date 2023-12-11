import React from 'react'
import "./footer.scss"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


const Footer = () => {
  return (
    <div className='outer'>
    <div className='button_container'>
        <button className='button_wrap'>
            <span>Chat with us
            <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.1.1/72x72/1f44b.png" alt="logo"></img> </span>

        </button>
        <span className='message'>

        <ChatBubbleOutlineIcon className='chat'/>
        
        </span>
    </div>

      
    </div>
  )
}

export default Footer
