import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Users from "./containers/Users";
import User from "./containers/User";
import SetDate from "./containers/SetDate";
import AppliedRoute from "./components/AppliedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/users" exact component={Users} props={childProps} />
    <AppliedRoute path="/user/:id" exact component={User} props={childProps} />
    <AppliedRoute path="/setDate" exact component={SetDate} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;