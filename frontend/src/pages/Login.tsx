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
            <div className="flex min-h-screen items-center justify-center bg-white px-4">
                <div className="w-full max-w-sm space-y-6 ">
                    <h1 className="text-center text-3xl font-bold text-[#E23774]">foodDeliverySite</h1>

                    <p className="text-center text-sm text-gray-500">Login or signup to continue</p>
                    <button onClick={googleLogin} disabled={loading} className="flex w-full items-center justify-center gap-3 rounded-xl border border-gey-300 bg-white px-4 py-3 ">
                        <FcGoogle size={20} />{loading ? "Signing in..." : "Continue with Google"}
                    </button>
                </div>

                <p className="text-center text-xs text-grey-400 ">By continuing you agree our {""}
                    <span className="text-[#E23774]">Terms of Service</span> ${" "} 
                    <span className="text-[#E23774]">Privacy Policy</span>
                </p>
            </div>
        </>
    )
}

export default Login;