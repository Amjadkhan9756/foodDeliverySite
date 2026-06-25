import {useState} from "react" 
import { useNavigate } from "react-router-dom";
import axios from "axios"



function Login(){
    const {loading ,setloading} = useState(false);
    const navigate = useNavigate();

    const responseGoogle = async(authResult:any) =>{
        setLoading(true);
        try{
            const result = await axios.post()

        } catch(error){
           
        }
    }
    return (
        <>
        <h1>Login </h1>
        </>
    )
}

export default Login;