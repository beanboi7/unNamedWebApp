import React, { useState } from "react"
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
// import Spinner from "../Spinner/spinner";


function Login(props){
    const [password, setPassword] = useState('');
    const [email, setMail] = useState('');
    const [redirect, setRedirect] = useState(false)
    //const [isLoading, setLoading] = useState(true)
     
    const loginHandle = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                password,
            })
        });
        // //parse the response from json to jsx, useful to debug without ui transitions
        const content = await response.json()
        console.log(content)
        setRedirect(true);
        props.setName(content.name);

    }

    if(redirect){
        return <Redirect to = "/" />
    }



    return(

        <form onSubmit = {loginHandle} >
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
            
                <input type="email" className="form-signin" id="floatingInput" placeholder="Email Address" 
                    onChange = { e => setMail(e.target.value)}
                />
            
            </div>
            <div className="form-floating">
            
                <input type="password" className="form-signin" id="floatingPassword" placeholder="Password" 
                    onChange = {e => setPassword(e.target.value)}
                />
            </div>
            <div className="checkbox mb-3">
                <input type="checkbox" defaultValue="remember-me" /> Remember me
            </div>
            <div>
                <Link to = "/register">Are you a new user?</Link>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        
        </form>
    )
}

export default Login;