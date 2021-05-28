import React, { useEffect, useState } from "react"
import Header from "./components/Header/Header"
import Login from "./components/LoginForm/Login"
import Register from "./components/RegisterForm/Register"
import Home from "./components/Home/Home"
import "./App.css"
import {BrowserRouter, Route} from "react-router-dom"

function App() {
    const [name,setName] = useState('');
    
    useEffect(() => {
      (
          async () =>  {
            const response = await fetch("http://localhost:3001/api/user", {
              method: "GET",
              headers: {"Content-Type": "application/json"},
              credentials: "include",
          });

          const content = await response.json()
          setName(content.name);
          }
      )();
    });
    
  return (
    <div className = "App">
    
      <BrowserRouter>
        <Header name = {name} setName = {setName} />
        <main className="form-signin">
          <Route path = "/" exact component = {() => <Home name = {name} />} />
          <Route path = "/login" component = {() => <Login setName = {setName}/>} />
          <Route path = "/register" component = { Register } />
          
        </main>
      </BrowserRouter>
      
    </div>

  )
};

export default App;