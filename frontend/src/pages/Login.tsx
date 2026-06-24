
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.emil.value;
        const password = e.target.password.value;


        try{
            const res = axios.post("")
        }

    }

}
