import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Leads from "../components/Leads";
import UsersManagement from "../components/UsersManagement";
import "./Layout.scss";
import LeadForm from "../components/LeadsForm";
import UserForm from "../components/UsersForm";
import authService from "../services/auth.service";

class Layout extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="d-flex">
          <div className="col-2 px-0 ">
            <Sidebar />
          </div>
          <div className="col-10">
            <Switch>
              <Route path="/leads" exact component={Leads} />
              <Route path="/leads/:id" component={LeadForm} />
              <Route
                path="/users/:id"
                render={props => {
                  if (authService.getCurrentUser().role === "admin")
                    return <UserForm {...props} />;
                  return <Redirect to="/" />;
                }}
              />
              <Route
                path="/users"
                render={props => {
                  if (authService.getCurrentUser().role === "admin")
                    return <UsersManagement {...props} />;
                  return <Redirect to="/" />;
                }}
              />
              <Redirect from="/" exact to="/leads" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
