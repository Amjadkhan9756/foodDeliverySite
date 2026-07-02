import { createContext, use, useState, type ReactNode } from "react"
import { useEffect } from "react";
import axios from "axios";


const AppContext  =  createContext(undefined)


interface AppProviderProps {
    children:ReactNode;
}


export const AppProvider = ({children}:AppProviderProps) => {
    const [user,setUser] = useState(null);
    const [isAuth,setIsAuth] = useState(false);
    const [loading,setLoading] = useState(true);

    const [location ,serLocation] = useState(null);
    const [loadingLocation ,setLoadingLocation ] = useState(false);

    const [city,setCity] = useState("fecting Location...");
    async function fetchUser(){
        try{
            const token = localStorage.getItem("token");
            const  {data} = await axios.get(`$(authService)/api/auth/me`,{
                headers :{
                 Authorization:`Bearer ${token}`,
                },

            });
            setUser(data.user);
            setIsAuth(true);

        } catch(error){
            console.log(error);

        } finally{
            setLoading(false);  
        }
    }


    useEffect(()=>{
        fetchUser();
    },[])
}
    