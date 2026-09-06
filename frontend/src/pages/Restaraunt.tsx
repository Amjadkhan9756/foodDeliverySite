import axios from "axios";
import type { IRestaurant } from "../types";
import { useEffect, useState } from "react";
import { restaurantService } from "../main";
import AddRestaurant from "../component/AddRestaurant";
function Restaraunt() {
    const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchRestaurant = async () => {
        try {
            const { data } = await axios.get(`${restaurantService}/api/restaurant/my`,
                {
                    headers: {

                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setRestaurant(data.restaurant || null);

            if (data.token) {
                localStorage.setItem("token", data.token);
            }

        } catch (error) {
            console.log(error);
        }

        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRestaurant();
    }, []);

    if(loading) {
        return <div className="flex min-h-screen justify-center items-center">
            <p className="text-gray-500">Loading...</p>
        </div>
    }

    if(!restaurant) {
        return <AddRestaurant/>
    }
    return (
        <>
            <h1>Hello, Restaurant!</h1>
        </>
    )
}

export default Restaraunt;