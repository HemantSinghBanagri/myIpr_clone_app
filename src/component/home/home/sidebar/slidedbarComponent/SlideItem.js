import React from 'react'
import { NavLink } from 'react-router-dom'
import "./slideItem.scss"
// import { useLocation } from 'react-router-dom'

const SlideItem = ({id,svg,name,link}) => {
  // const location=useLocation()
  return (
    <>
    <div className='active-link-nav'>
    <NavLink to={link} >
    <div className='navbar-item'>
    <div className='item-name'>
    {svg}
    <span>{name}</span>

    </div>

    </div>
    
    
      </NavLink>
      </div>
    </>
  )
}

export default SlideItem
