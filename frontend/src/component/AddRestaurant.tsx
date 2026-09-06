import { longitude, latitude, formattedAddress } from "../utils/location";
import { useState } from "react";
import axios from "axios";
import { restaurantService } from "../main";
import { toast } from "react-hot-toast";

function AddRestaurant() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);


    const handleSubmit = async () => {
        if (!name || !phone || !image) {
            alert("Please fill all the fields");
            return;
        }

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("latitude", String(location.latitude));
        formData.append("longitude", String(location.longitude));
        formData.append("formatedAddress", location.formattedAddress);

        formData.append("file", image);
        formData.append("phone", phone);

        try {
            setSubmitting(true);
            await axios.post(`${restaurantService}/api/restaurant/new`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            toast.success("Restaurant added successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to add restaurant");
        }
        finally {
            setSubmitting(false);
        }

    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 px-4  py-6">
                <div className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-sm space-y-5">
                    <h1 className="text-xl font-semibold">Add Restaurant</h1>

                    <input type="text"
                     placeholder="Restaurant 
                     Name" value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full rounded-lg border px-4 py-2 text-sm outline-none" />


                </div>

            </div>
        </>
    )
}

export default AddRestaurant;