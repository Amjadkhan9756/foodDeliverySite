import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

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
      const result = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          code: authResult.code,
        }
      );

      localStorage.setItem("token", result.data.token);
      toast.success(result.data.message);

      navigate("/");
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data.message || "Server Error");
      } else {
        toast.error("Cannot connect to backend");
      }
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: responseGoogle,
    onError: () => {
      toast.error("Google login failed");
      setLoading(false);
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg border p-6 shadow">
        <h1 className="text-center text-3xl font-bold text-[#E23774]">
          Food Delivery Site
        </h1>

        <p className="text-center text-sm text-gray-500">
          Login or signup to continue
        </p>

        <button
          onClick={() => googleLogin()}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 hover:bg-gray-100"
        >
          <FcGoogle size={20} />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        <p className="text-center text-xs text-gray-400">
          By continuing you agree to our{" "}
          <span className="text-[#E23774]">Terms of Service</span> and{" "}
          <span className="text-[#E23774]">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

export default Login;