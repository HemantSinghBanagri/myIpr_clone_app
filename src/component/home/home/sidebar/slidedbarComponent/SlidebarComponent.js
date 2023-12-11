import React from 'react'

import SlideItem from './SlideItem'




const SlidebarComponent = ({id,slidedata}) => {
  return (
    <>
   {
    slidedata.map(({svg,name,link})=>(
        <SlideItem key={id} svg={svg} name={name}  link={link}/>

    ))
   }
   </>
  )
  
}

export default SlidebarComponent
