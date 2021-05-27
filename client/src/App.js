import React, {useState, useEffect} from "react"
import Header from "./components/Header/Header"
import Login from "./components/LoginForm/Login"
import Register from "./components/RegisterForm/Register"
import Home from "./components/Home/Home"
import "./App.css"
import {BrowserRouter, Route} from "react-router-dom"

export default function App() {
  const [name,setName] = useState('');

    useEffect( ()=>{
        (
            async () =>{
                const response = await fetch("http://localhost:3001/api/user", {
                    headers: {"Content-type": "application/json"},
                    credentials: "include",
                });
                const content = await response.json();
                setName(content.name);
            }
        )();
    })
  return (
    <div className = "App">
    
      <BrowserRouter>
        <Header name = {name} />
        <main className="form-signin">
          <Route path = "/" exact component = {() => <Home name = { name } />} />
          <Route path = "/register" exact component = { Register } />
          <Route path = "/login" exact component = { Login } />
        </main>
      </BrowserRouter>
      
    </div>

  )
};