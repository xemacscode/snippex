import React, {useEffect, useState} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Snippets from './components/Snippets';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';



function App() {
  


  return (
    // BEM naming conventions
    
      <Router>
      <div className="app">
          <Switch>               
            <Route component={Login} path="/signin" />            
            <Route component={Register} path="/signup"/>                       
            <Route path="/">
            <h1>DOSCST - Code Snippex</h1>
              <div className="app__body">
                  {/* Sidebar */}
                  <Sidebar/>
                  {/* Main Content */}                  
                  <Snippets/>
              </div>
            </Route>
          </Switch>        
      </div>
      </Router>
    
  );
}

export default App;
