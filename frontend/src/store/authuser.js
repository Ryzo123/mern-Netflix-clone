

import {create} from 'zustand'

import axios from 'axios'
import toast from 'react-hot-toast'

export const useAuthStore=create((set)=>({
    user:null,
    isSignUp:false,
    isSignIn:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    signup:async(credentials)=>{
        set({isSignUp:true})
        try {
            const response=await axios.post("/api/v1/auth/signup", credentials);
            set({user:response.data.user, isSignUp:false})
            toast.success("signup successful")
        } catch (error) {
            toast.error(error.response.data.message ||"An error occured")
            set({isSignUp:false, user:null})
        }
        

    },
    signin:async(credentials)=>{
        set({isSignIn:true})
        try {

            const response=await axios.post("/api/v1/auth/login", credentials);
            set({user:response.data.user, isSignIn:false})
            toast.success("login successful")
            
        } catch (error) {
            set({isSignIn:false, user:null})
            toast.error(error.response.data.message||"login failed")
            
        }
    },
    logout:async()=>{

        set({isLoggingOut:true})
        try {
            await axios.post("/api/v1/auth/logout")
            set({user:null, isLoggingOut:false})
            toast.success("logged out successfully")
            
        } catch (error) {
            set({isLoggingOut:false})
            toast.error(error.response.message||"logout failed")
        }
    },
    authCheck:async()=>{
        set({isCheckingAuth:true})
        try {
            const response=await axios.get("/api/v1/auth/authcheck");
            set({user:response.data.user, isCheckingAuth:false})
            
        } catch (error) {

            set({isCheckingAuth:false , user:null})
            
        }
    },
}))