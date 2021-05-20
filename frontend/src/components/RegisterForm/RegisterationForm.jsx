import React, { useState } from 'react';
import AlertComponent from "../Alert/AlertComponent";
import axios from 'axios';
import {withRouter} from "react-router-dom";


function RegisterationForm(props){
    const [currentState, setState] = useState({
            email : "",
            password : "",
            confirmpassword : "",
            success: null,
        });
    
    const handleChange = (e) => {
        const {id,value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value,
        }))
    }
    
    const handleSubmitChange = (e) =>{
        e.preventDefault();
        if(currentState.password === currentState.confirmpassword){
            //call api and handle it
            sendDetailsToServer();
        } else{
            props.showError("Passwords don't match!")
        }
    }

    const sendDetailsToServer = async () =>{
        if(currentState.email.length && currentState.password.length){
            props.showError(null);
            const payload = {
                email: currentState.email,
                password: currentState.password,
            }
            response = await axios.post(API_BASE_URL+'register', payload)
            
            if(response.data.code === 200){
                setState(prevState => ({
                    ...prevState,
                    'success' : 'Registration successful. Redirecting to home page..'
                }))
            redirectToHome();
            props.showError(null)
            } else if (response.data.code == 404){
                props.showError("Some error ocurred");
            } else{
                props.showError("Enter valid userName and password")
            }
        } 
    }

    const redirectToHome = () =>{
        props.updateTitle("Home");
        props.history.push("/home");
    }
    const redirectToLogin = () =>{
        props.updateTitle("Login");
        props.history.push("/login");
    }

    
    return(
        <div className ="card col-12 col-lg-4 login-card mt-2 hv-center">
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
            <div className="alert alert-success mt-2" style={{display: currentState.success ? 'block' : 'none' }} role="alert">
                {currentState.success}
            </div>
            <div className="mt-2">
                <span>Already have an account?</span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            
        </div>
        
    );
}

export default withRouter(RegisterationForm);