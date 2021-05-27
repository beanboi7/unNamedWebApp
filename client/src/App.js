import React from "react"
import Header from "./components/Header/Header"
import Login from "./components/LoginForm/Login"
import Register from "./components/RegisterForm/Register"
import Home from "./components/Home/Home"
import "./App.css"
import {BrowserRouter, Route} from "react-router-dom"

export default function App() {
  return (
    <div className = "App">
    
      <BrowserRouter>
        <Header />
        <main className="form-signin">
          <Route path = "/" exact component = { Login } />
          <Route path = "/home" component = {Home} />
          <Route path = "/register" exact component = { Register } />
          <Route path = "/login" exact component = { Login } />
        </main>
      </BrowserRouter>
      
    </div>

  )
};