import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";



function Login() {
    const { loading, setLoading } = useState(false);
    const navigate = useNavigate();

    const responseGoogle = async (authResult: any) => {
        setLoading(true);
        try {
            const result = await axios.post(`$(authService)/api/auth/login`, {
                code: authResult["code"]

            });
            localStorage.setItem("token", result.data.token);
            toast.success(result.data.message);
            navigate("/");


        } catch (error) {
            console.log(error);
            toast.error("Problem occurred while logging in")
            setLoading(false);

        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code"
    })
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-white px-4">
                <div className="w-full max-w-sm space-y-6 ">
                    <h1 className="text-center text-3xl font-bold text-[#E23774]">foodDeliverySite</h1>

                    <p className="text-center text-sm text-gray-500">Login or signup to continue</p>
                </div>

            </div>
        </>
    )
}

export default Login;