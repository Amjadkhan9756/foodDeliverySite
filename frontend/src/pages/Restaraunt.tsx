import axios from "axios";
import type { IRestaurant } from "../types";
import { useEffect, useState } from "react";
import { restaurantService } from "../main";
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
    return (
        <>
            <h1>Hello, Restaurant!</h1>
        </>
    )
}

export default Restaraunt;