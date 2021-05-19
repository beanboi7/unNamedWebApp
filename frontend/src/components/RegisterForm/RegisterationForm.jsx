import React, { useState } from 'react';

function RegisterationForm(){
    const [currentState, setState] = useState({
            email : "",
            password : ""
        });
    
    const handleChange = e => {
        const {id,value} = e.target;
        setState(currentState => ({
            ...currentState,
            [id]: value,
        }))
    }

    
    return(
        <div>
            <form> 
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type = "email"
                        className = "form-control"
                        id = "email"
                        aria-describedby = "emailHelp"
                        placeholder = "Enter your email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Password</label>
                    <input type = "password"
                        className = "form-control"
                        id = "password"
                        placeholder = "Enter your password" />
                </div>

                <div className = "form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                    />
                </div>


                <button 
                    type="submit"
                    className="btn btn-primary"
                    >
                    Register
                </button>

            </form>
        </div>
    );
}

export default RegisterationForm;