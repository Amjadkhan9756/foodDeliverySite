import { createContext, useContext, useState, type ReactNode } from "react"
import { useEffect } from "react";
import axios from "axios";
import type { AppContextType, User } from "../types";
import { authService } from "../main";


const AppContext = createContext<AppContextType | undefined>(undefined)


interface AppProviderProps {
    children: ReactNode;
}


export const AppProvider = ({ children }: AppProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const [location, setLocation] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const [city, setCity] = useState("Detecting Location...");

    async function fetchUser() {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(`${authService}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(data.user);
            setIsAuth(true);

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <AppContext.Provider
            value={{
                user,
                loading,
                isAuth,
                setUser,
                setLoading,
                setIsAuth,
                location,
                setLocation,
                loadingLocation,
                setLoadingLocation,
                city,
                setCity,
            }}>
            {children}
        </AppContext.Provider>
    )
};


export const useAppData = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppData must be used within an AppProvider");
    }
    return context;
};