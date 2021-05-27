import React from "react"
import { Link } from "react-router-dom";
import "../../App.css"

function Header(){
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to ="/" className="navbar-brand" href="/">Home</Link>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item active">
                            <Link to = "/login" className="nav-link" aria-current="page" href="#">Login</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to ="/register" className="nav-link" href="#">Register</Link>
                        </li>
                    </ul>
                
            </div>
        </nav>
    )
}

export default Header;