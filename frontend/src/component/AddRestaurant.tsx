import { longitude, latitude, formattedAddress } from "../utils/location";
import { useState } from "react";
import axios from "axios";
import { restaurantService } from "../main";
import { toast } from "react-hot-toast";
import { BiUpload } from "react-icons/bi";

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
                     className="w-full rounded-lg border px-4 py-2 text-sm outline-none" 
                    />

                    <input type="number" 
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className = "w-full rounded-lg border px-4 py-2 text-sm outline-none"
                    />

                    <textarea 
                    placeholder = "Description"
                    value={description}
                    onChange = {
                        (e) => setDescription(e.target.value)
                    }
                    className = "w-full rounded-lg border px-4 py-2 text-sm outline-none"
                    />

                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm text-grey-600 hover:bg-gray-100">
                        <BiUpload className="text-2xl text=gray-600"/>
                        {image ? image.name : "Upload Image"}
                        <input type = "file "
                        accept = "image/*"
                        hidden
                        onChange = {
                            (e) => setImage(e.target.files ?.[0] || null)
                        }

                        />

                    </label>

                    <div className = "flex items-start  gap-3 rounded-lg border p-4 ">
                        <BiMapPin className = "text-2xl text-red-500" />
                        <div className = "text-sm">
                            {loadingLocation ? "Fetching you location..." : location?.formattedAddress || "Location not found"}
                        </div>
                    </div>

                    <button className = "w-full rounded-lg py-3 text-sm fon-semibold text-white bg-[#23744] "
                     disabled = {submitting }
                      onClick = {handleSubmit}>
                        {submitting ? "Submitting..." : "Add Restaurant"}
                    </button>




                </div>



            </div>
        </>
    )
}

export default AddRestaurant;