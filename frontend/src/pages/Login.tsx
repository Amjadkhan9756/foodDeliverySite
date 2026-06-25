import {useState} from "react" 
import { useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";



function Login(){
    const {loading ,setLoading} = useState(false);
    const navigate = useNavigate();

    const responseGoogle = async(authResult:any) =>{
        setLoading(true);
        try{
            const result = await axios.post(`$(authService)/api/auth/login`,{
                code:authResult["code"];

            });
            localStorage.setItem("token", result.data.token);  
            toast.success(result.data.message);
            navigate("/");


        } catch(error){
            console.log(error);
            toast.error("Problem occurred while logging in")
            setLoading(false);
           
        }
    }
    return (
        <>
        <h1>Login </h1>
        </>
    )
}

export default Login;