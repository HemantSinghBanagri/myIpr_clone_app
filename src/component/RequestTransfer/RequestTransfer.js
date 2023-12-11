// Example: src/components/RequestTransferWrapper.js
import React from 'react';
import {  NavLink, Outlet } from 'react-router-dom';
import './requestTransfer.scss'



console.log("patnam",window.location.pathname)

const RequestTransferWrapper = () => {
  return (
    
      <div className='main-request-receive-sent'>
      <h2>Certificate transfer</h2>
        <div className='menu-link-container'>
          <NavLink  to='receive'>Received</NavLink>
          <NavLink  to="sent">Sent</NavLink>
          
        </div>
        <div className='line-status'/>
        <Outlet/>
        

        
      </div>
    
  );
};

export default RequestTransferWrapper;
