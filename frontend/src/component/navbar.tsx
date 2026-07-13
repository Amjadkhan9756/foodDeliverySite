import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { useEffect, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";


const Navbar = () => {
    const { isAuth } = useAppData();
    const currLocation = useLocation();
    const isHomePage = currLocation.pathname === "/";
    const { searchParams, setSearchParams } = useSearchParams();
    const { search, setSearch } = useState(searchParams.get("search") || "");


    useEffect(() => {
        const timer = setTimeout(() => {
            if (search) {
                setSearchParams({ search })
            }
            else {
                setSearchParams({})
            }
            return () => clearTimeout(timer)
        }, 500)

    }, [search])
    return (
        <>
            <div className=" w-full bg-white shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 ">
 
                  <Link to="/" className="text-2xl font-bold text-[#E23744] cursor-pointer ">
                    Food Delivery
                  </Link>

                  <div className="flex items-center gap-4">
                    <Link to={"/cart"} className="relative ">
                    <CgShoppingCart className="h-6 w-6 text-[#E23744]"/>
                    <span className ="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#E23744] text-xs text-white">
                      0
                    </span>
                    </Link>
                  </div>
                </div>
            </div>
        </>

    )
}

export default Navbar;