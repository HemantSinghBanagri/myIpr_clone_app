import { createContext, useContext,useState,useEffect } from "react";
import {
signInWithEmailAndPassword,
onAuthStateChanged,
signOut,

} from  'firebase/auth'
import { auth } from "../firebase/firebase"; 



const AuthContext=createContext()

export const AuthContextProvider=({children})=>{

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    


    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            console.log('onAuthstatechange' ,user)
            setUser(user)
            setLoading(false)
            
        })


        return ()=>unsubscribe()
        
        
    },[])

    // const createUser =async (email,password)=>{


    //     try {
    //         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //         const newUser = userCredential.user;
    //         setUser(newUser);
    //         return newUser;
    //       }catch(error){
    //         console.error("error",error.message)
    //         throw error

    //     }
    // }

    const loginUser=async(email,password)=>{



        try{

            const userCredential=await signInWithEmailAndPassword(auth, email,password)
            const loggedInUser=userCredential.user
            setUser(loggedInUser)
            return(loggedInUser)
            

        }catch(error){

            console.error("error",error.message)
            throw error;
        }
    }



    const logoutUser=async()=>{

        try{
            await signOut(auth)
            setUser(null)

        }catch(error){
            console.error('logout error',error.message)
            throw error;

        }
    }
        
    return (
        <AuthContext.Provider value={{user,loading,loginUser,logoutUser}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


export const  UserAuth=()=>{
    return useContext(AuthContext)
}