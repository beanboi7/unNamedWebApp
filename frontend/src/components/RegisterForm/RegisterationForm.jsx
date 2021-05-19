import React, { useState } from 'react';
import AlertComponent from "../Alert/AlertComponent";


Need to add success MessageChannel, server status, redirection to home


function RegisterationForm(props){
    const [currentState, setState] = useState({
            email : "",
            password : "",
            confirmpassword : "",
        });
    
    const handleChange = (e) => {
        const {id,value} = e.target;
        setState(currentState => ({
            ...currentState,
            [id]: value,
        }))
    }
    
    const handleSubmitChange = (e) =>{
        e.preventDefault();
        if(currentState.password === currentState.confirmpassword){
            //call api and handle it
            console.log("call the backend API to post the registration details")
        } else{
            props.showError("Passwords don't match!")
        }
    }

    
    return(
        <div className ="card col-12 col-lg-4 login-card mt-2 hv-center">
        <AlertComponent />
            <form> 
                <div className="col-auto">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type = "email"
                        className = "form-control"
                        id = "email"
                        aria-describedby = "emailHelp"
                        placeholder = "Enter your email" 
                        onChange = {handleChange}
                        />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="col-auto">
                    <label for="inputPassword6" class="col-form-label">Password</label>
                </div>
                <div className="col-auto">
                    <input type="password" 
                    id="inputPassword6" 
                    class="form-control" 
                    aria-describedby="passwordHelpInline" 
                    onChange = {handleChange}
                    />
                
                <div className="col-auto">
                    <span id="passwordHelpInline" class="form-text">
                    Must be 8-20 characters long.
                    </span>
                </div>

                <div className = "form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        onChange = {handleChange}
                    />
                </div>


                <button 
                    type="submit"
                    className="btn btn-primary"
                    onClick = {handleSubmitChange}
                    >
                    Register
                </button>

                </div>
            </form>

            
        </div>
        
    );
}

export default RegisterationForm;