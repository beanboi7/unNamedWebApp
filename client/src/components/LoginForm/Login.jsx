import React from "react"


function Login(){
    return(
        <main className="form-signin">
        <form>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
            
                <input type="email" className="form-signin" id="floatingInput" placeholder="Email Address" />
            
            </div>
            <div className="form-floating">
            
                <input type="password" className="form-signin" id="floatingPassword" placeholder="Password" />
            </div>
            <div className="checkbox mb-3">
                <input type="checkbox" defaultValue="remember-me" /> Remember me
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        
        </form>
        </main>
    )
}

export default Login;