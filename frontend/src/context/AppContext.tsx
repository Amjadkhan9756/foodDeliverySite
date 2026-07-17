import { createContext, useContext, useState, type ReactNode } from "react";
import { useEffect } from "react";
import axios from "axios";
import type { AppContextType, LocationData, User } from "../types";
import { authService } from "../main";

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const [location, setLocation] = useState<LocationData | null>(null);
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
    }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
        alert("Please allow location access to continue");
        return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await res.json();

                setLocation({
                    latitude,
                    longitude,
                    formattedAddress: data.display_name || "current location",
                });

                setCity(
                    data.address?.city ||
                    data.address?.town ||
                    data.address?.village ||
                    "Your location"
                );
            } catch (error) {
                setLocation({
                    latitude,
                    longitude,
                    formattedAddress: "current location",
                });
                setCity("failed to load");
            } finally {
                setLoadingLocation(false);
            }
        },
        (error) => {
            console.error("Geolocation error:", error.message);
            setLoadingLocation(false);
            setCity("Location permission denied");
        }
    );
}, []);

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
                fetchUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppData = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppData must be used within an AppProvider");
    }
    return context;
};