import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc"
import { authService } from "../main";


function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const responseGoogle = async (authResult: any) => {
        setLoading(true);

        if (!authResult?.code) {
            toast.error("Google login failed");
            setLoading(false);
            return;
        }

        try {
            const result = await axios.post(`${authService}/api/auth/login`, {
                code: authResult["code"]
            });

            localStorage.setItem("token", result.data.token);
            toast.success(result.data.message);
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Problem occurred while logging in");
            setLoading(false);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: () => {
            toast.error("Google login failed");
            setLoading(false);
        },
        flow: "auth-code"
    })
    return (
        <>
           
        </>
    )
}

export default Login;