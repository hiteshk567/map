import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./Homepage/Home";
import MainNavigation from "./Navigation/MainNavigation";

function App() {
  const routes = (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <React.Fragment>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </React.Fragment>
  );
}

export default App;
