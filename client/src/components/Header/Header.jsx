import React from "react"
import { Link } from "react-router-dom";
import "../../App.css"

function Header(props){
    
    const logout = async () => {
        const response = await fetch("http://localhost:3001/api/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        });
        //parse the response from json to jsx, useful to debug without ui transitions
        const jsonData = response.json()
        console.log(jsonData)

        props.setName('')
    }

    let menu;

    if (props.name === ''){
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to = "/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to ="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else{
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to = "/logout" className="nav-link" onClick = {logout}>Logout</Link>
                </li>
            </ul>
        )
    }
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to ="/" className="navbar-brand" href="/">Home</Link>
                <div>
                    {menu}
                </div>
                
            </div>
        </nav>
    );
};

export default Header;