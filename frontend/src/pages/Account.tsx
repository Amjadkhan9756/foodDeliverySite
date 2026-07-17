import { toast } from "react-hot-toast/headless";
import { useAppData } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { BiPackage } from "react-icons/bi";

function Account() {
  const { user, setUser, setIsAuth } = useAppData();
  const firstLetter = user?.name?.charAt(0).toUpperCase();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.setItem("token", "");
    setUser(null);
    setIsAuth(false);
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-grey-50 px-4 py-6">
      <div className="mx-auto max-w-md rounded-2xl bg-white shadow-sm">
        <div className="flex items-center gap-4 border-b p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-xl font-semibold text-white">
            {firstLetter}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div className="divide-y">
          <div
            className="flex cursor-pointer items-center gap-4 p-5 hover:bg-gray-50"
            onClick={() => navigate("/orders")}
          >
            <BiPackage className="h-5 w-5 text-red-500" />
            <span className="font-medium">Your Orders</span>
          </div>
           <div
            className="flex cursor-pointer items-center gap-4 p-5 hover:bg-gray-50"
            onClick={() => navigate("/address")}
          >
            <BiPackage className="h-5 w-5 text-red-500" />
            <span className="font-medium">Your Address</span>
          </div>
          <div
            className="flex cursor-pointer items-center gap-4 p-5 hover:bg-gray-50"
            onClick={logoutHandler}
          >
            <span className="font-medium text-red-500">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
