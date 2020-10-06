import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import authService from "./services/auth.service";
import Layout from "./containers/Layout";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        <Route path="/not-found" render={() => <h1>NOT FOUND</h1>} />
        <Route
          path="/"
          render={props => {
            if (!authService.getCurrentUser()) return <Redirect to="/login" />;
            return <Layout {...props} />;
          }}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
