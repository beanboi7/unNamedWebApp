import React, { useState } from "react"
import { Redirect } from "react-router";


function Login(){
    const [password, setPassword] = useState('');
    const [email, setMail] = useState('');
    const [redirect, setRedirect] = useState(false)
     
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
        const jsonData = response.json()
        console.log(jsonData)
        setRedirect(true);

    }

    if(redirect){
        return <Redirect to = "/home" />
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
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        
        </form>
    )
}

export default Login;