import React, { useState } from "react";
import Header from "./components/Header/Header";
import RegisterationForm from "./components/RegisterForm/RegisterationForm";
import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/Alert/AlertComponent';  


function App(){
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  return(
    <Router>
      <div className = "App">
        <Header title = {title}/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path = "/" exact={true}>
              <RegisterationForm showError = {updateErrorMessage} updateTitle = {updateTitle} />
            </Route>
            <Route path = "/register" exact={true}>
              <RegisterationForm showError = {updateErrorMessage} updateTitle = {updateTitle} />
            </Route>
            <Route path = "/login" exact={true}>
              <LoginForm showError = {updateErrorMessage} updateTitle = {updateTitle} />
            </Route>
            <Route >
              <Home />
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError = {updateErrorMessage} />
        </div>
      </div>
    </Router>
    
  )
}

export default App;