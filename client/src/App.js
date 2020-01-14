import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
  return (
    <Router>
      <div className="">
        <header className="">
          <Link to="/other">Other Page</Link>
          <Link to="/">Home</Link>

        </header>
        <Switch>
          <Route exact path="/" component={Fib}></Route>
          <Route path="/other" component={OtherPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
