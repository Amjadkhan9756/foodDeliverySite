import {useState} from "react" 
import { useNavigate } from "react-router-dom";
function Login(){
    const {loading ,setloading} = useState(false);
    const navigate = useNavigate();
    return (
        <>
        <h1>Login </h1>
        </>
    )
}

export default Login;