import React, { useState , useEffect } from "react"
import { Redirect } from "react-router";
// import Spinner from "../Spinner/spinner";

function Register() {
    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    // const [isLoading, setLoading] = useState(true);

    
        const handleSubmit = async (e) => {
            e.preventDefault();

            //call api and make a post req
            const response = await fetch("http://localhost:3001/api/register", 
            { // this function is the init values sent along the req
                method: "POST",
                headers: {"Content-Type": "application/json"},
                //body sends the js values by converting into json using method below
                body: JSON.stringify({
                    name,
                    email,
                    password,
                })
            }); //this gives us the response values from POST req as JSON objects. Now to parse it to js below method

            const parsedData = response.json();
            console.log(parsedData);
            setRedirect(true);

        }

    if (redirect){
        return  <Redirect to = "/login" />
    } 
    
    
    return( 
       
        <form onSubmit = { handleSubmit }>
            <h1 className="h3 mb-3 fw-normal">Register</h1>
            <div className="form-floating">
            
                <input className="form-signin" id="floatingInput" placeholder="Name"
                    onChange = {e => setName(e.target.value)}
                 />
            
            </div>
            <div className="form-floating">
            
                <input type="email" className="form-signin" id="floatingInput" placeholder="Email Address" 
                    onChange = {e => setMail(e.target.value)}
                />
            
            </div>
            <div className="form-floating">
            
                <input type="password" className="form-signin" id="floatingPassword" placeholder="Password" 
                    onChange = {e => setPassword(e.target.value)}
                />
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit" >Register</button>
        
        </form> 
    )
}

export default Register;