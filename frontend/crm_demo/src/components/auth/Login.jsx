import React from "react";
import FormGroup from "../shared/FormGroup";
import Form from "../shared/Form";
import Joi from "joi";
import { NavLink, Redirect } from "react-router-dom";
import "./authStyles.scss";
import authService from "../../services/auth.service";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  });

  doSubmit = async () => {
    try {
      await authService.login(this.state.data.email, this.state.data.password);
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
      this.setState({ errors: { email: error.message } });
    }
  };
  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;

    const { errors } = this.state;
    return (
      <div className="card-wrapper">
        <h4 className="font-weight-light text-center mb-4">Demo CRM</h4>
        <div className="card p-3">
          <form onSubmit={this.submitHandler}>
            <FormGroup
              name="email"
              placeholder="Email address"
              error={errors}
              onChange={this.inputChangeHandler}
            />
            <FormGroup
              name="password"
              placeholder="Password"
              type="password"
              error={errors}
              onChange={this.inputChangeHandler}
            />
            <button
              type="submit"
              className="btn btn-block btn-primary btn-sm mt-3">
              Login
            </button>
          </form>
          <p className="small mb-0 mt-2">
            Don't have an account? <NavLink to="/register">Create one</NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
