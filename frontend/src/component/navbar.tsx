import { useLocation,useSearchParams } from "react-router-dom";
import { useAppData } from "../context/AppContext";

import {   useEffect, useState } from "react";
    

const Navbar = ()=>{
    const {isAuth } = useAppData();
    const currLocation = useLocation();
    const isHomePage = currLocation.pathname === "/";
    const {searchParams,setSearchParams} = useSearchParams();
    const {search,setSearch} = useState(searchParams.get("search") || "");


    useEffect(()=>{
        const timer =   setTimeout(()=>{
            if(search){
                setSearchParams({search})
            }
            else{
                setSearchParams({ })
            }
            return ()=>clearTimeout(timer)
        }, 500)

    }, [search])
    return (
        <>
        <h1>Navbar</h1>
        </>
    )
}

export default Navbar;