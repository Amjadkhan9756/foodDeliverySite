
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
            const res = axios.post("http://localhost:3000/api/auth/login",{
                name,
                email,
                password
            })

            console.log(res.data);
            alert(res.data.message);
            navigate("/login");


        } catch(error){
            console.log(error.res.data);
            alert(error.res.data.message);
        }

    }

    return (
        <>
        <div className="auth-page-wrapper">
            <div className="auth-card">
                <h1>create account </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>name</label>
                        <input type="text" name="name" required/>
                    </div>
                    <div>
                        <label>email</label>

                        <input type="email" name="email" required/>
                    </div>
                    <div>
                        <label>password</label>
                        <input type="password" name="password" required/>
                    </div>
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>

        </div>
        
        </>
    )

}
