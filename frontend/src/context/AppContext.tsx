import { createContext, useState, type ReactNode } from "react"




const AppContext  =  createContext(undefined)


interface AppProviderProps {
    children:ReactNode;
}


export const AppProvider = ({children}:AppProviderProps) => {
    const [user,setUser] = useState(null);
    const [isAuth,setIsAuth] = useState(false);
    const [loading,setLoading] = useState(false);

}
    