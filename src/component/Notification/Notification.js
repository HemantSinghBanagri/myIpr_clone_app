// import React,{useState,useEffect} from 'react'
// import {requestForTokken,onMessageListener} from '../../firebase/firebase'
// import { Toast, Toaster }from 'react-hot-toast'
// import toast from 'react-hot-toast'

// const Notification = () => {
//     const [notificaiton,setnotification]=useState({title:'',body:''})
//     const notify=()=>toast(<ToastDisplay/>)
//     function ToastDisplay(){
//         return(
//             <div>
//                 <p>{notificaiton?.title}</p>
//                 <p>{notificaiton?.body}</p>
//             </div>
//         )
//     }


//     useEffect(()=>{
//         if(notificaiton?.title){
//             notify()
//         }
//     },[notificaiton])
//   requestForTokken()
//   onMessageListener()
//   .then((payload)=>{
//     setnotification({title: payload?.notification?.title, body: payload?.notification?.body});
//   })
//   .catch((err)=>console.log('failed',err))
//   return(
//     <Toaster/>
//   )
// }


// export default Notification
