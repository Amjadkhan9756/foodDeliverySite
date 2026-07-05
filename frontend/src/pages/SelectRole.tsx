import { use, useState } from "react";
import { useAppData } from "../context/AppContext";}
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Role = "customer" | "driver" | "seller" | null;

const SelectRole = () => {
    const [role, setRole] = useState<Role>(null);
    const { setUser } = useAppData();
    const navigate = useNavigate();

    const roles: Role[] = ["customer", "driver", "seller"]

    const addRole = async () => {
        try {
            const { data } = await axios.post(`{authServer}/api/auth/add/role`, { role },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `
                    }
                })
            localStorage.setItem("token", data.token)
            setUser(data.User);

            navigate("/", { replace: true });



        } catch (error) {
            alert("Somthing went wrong ");
            console.log(error);

        }
    }

    return (<>

        <div className="flex min-h-screen item-center justify-center bg-white px-4">
            <div>
                <h1></h1>
                <div>
                    {
                        roles.map((r) => (
                          <button key={r} onClick={()=>setRole(r)} className=" ">

                          </button>
                       ))
                    }
                </div>
            </div>
        </div>

    </>)

}

export default SelectRole;