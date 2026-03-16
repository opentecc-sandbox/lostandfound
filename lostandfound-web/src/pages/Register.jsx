import React ,{ useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
const Regester =() => {
    const [email,setEmail] =useState("");
    const[password,setPassword] =useState("");
    const [contactNumber, setContactNumber] = useState("");
    const navigate =useNavigate();


    const handleRegister =async(e)=>{
        e.preventDefaul();
        try{
            await api.post ("/auth/register",{
                email,
                password,
                contactNumber
            });
            alert(" Account created successfully! , please login to continue.");
            navigate("/login");
        }
        catch(err){
            console.error(err)
            alert("Something went wrong, Email might already exist.")
        }

    }
    return(
        <div>
            <h2>Creat  an account</h2>
            <form onSubmit={handleRegister}>
                <label><b>Email Adress</b></label>
                < input 
                type='email'
                placholder='Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                />
                
                <label><b>Contact Number</b></label>
                <input 
                type='contactNumber'
                value={contactNumber}
                onChange={(e)=>setContactNumber(e.target.value)}
                required
                />

                <label><b>Password</b></label>
                <input 
                type='password'
                placholder='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};
export default Regester ;