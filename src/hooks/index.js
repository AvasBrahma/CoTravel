import { useContext, useState, useEffect } from "react"
import jwt from 'jwt-decode'
import { AuthContext } from "../providers/AuthProvider";
import {login as userLogin} from '../api'
import { setItemsFromLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemsFromLocalStorage } from "../utils";

export const useAuth=()=>{
    return useContext(AuthContext);
}

export const useProvideAuth=()=>{

    const[user, setUser]= useState(null);
    const[loading, setLoading]= useState(true);
    
    useEffect(()=>{
       //get the token from localstorage
       const userToken=getItemsFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
       if(userToken){
        //if user token present we will call jwt decode library to decode it
        const user=jwt(userToken);
        setUser(user);
       }
       setLoading(false);
    }, [])





    const login=async (email, password)=>{
         const response=await userLogin(email, password);
         if(response.success){
            setUser(response.data.user);
            setItemsFromLocalStorage(LOCALSTORAGE_TOKEN_KEY, 
                response.data.token ? response.data.token: null);
            return{
                success: true
            }
         } else {
            return{
                success: false,
                message: response.message
            }
         }
    }

    const logout=()=>{
          setUser(null);
          removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    }

    return{
        user,
        login,
        logout,
        loading
    }

}