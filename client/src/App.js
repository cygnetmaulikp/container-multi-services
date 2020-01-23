import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Fib from "./Fib";
import OtherPage from "./OtherPage";
import AboutPage from "./About";

function App() {
  return (
    <Router>
      <div className="">
        <header className="">
          <Link to="/">Home</Link>
          <Link to="/other">Other Page</Link>
          <Link to="/about">About</Link>

        </header>
        <Switch>
          <Route exact path="/" component={Fib}></Route>
          <Route path="/other" component={OtherPage}></Route>
          <Route path="/about" component={AboutPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
