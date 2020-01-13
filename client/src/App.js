import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Link } from "react-router-dom";
import { Router, Switch, Route } from "react-router";
import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link to="/">Home</Link>
          <Link to="/other">Other Page</Link>
        </header>
        <Switch>
          <Route exact path="/other" component={OtherPage}></Route>
          <Route exact path="/" component={Fib}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
