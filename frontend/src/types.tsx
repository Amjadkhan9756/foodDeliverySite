export interface User{
    _id:String,
    name:String,
    email:String,
    image:String,
    role:String
}


export interface LocationData{
    latitude:number,
    longitude:number,
    formattedAddress:String
}

export interface AppContextType{
    user: User | null,
    loading: boolean,
    isAuth : boolean,
    setUser:React.Dispatch<React.SetStateAction< User | null>>;
    setLoading:React.Dispatch<React.SetStateAction<Boolean>>;
    setIsAuth:React.Dispatch<React.SetStateAction<Boolean>>;

}