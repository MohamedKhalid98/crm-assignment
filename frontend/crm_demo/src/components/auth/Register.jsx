import React from "react";
import FormGroup from "../shared/FormGroup";
import Form from "../shared/Form";
import Joi from "joi";
import { NavLink, Redirect } from "react-router-dom";
import { register } from "../../services/users.service";
import "./authStyles.scss";
import authService from "../../services/auth.service";

class Register extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(4),
  });

  doSubmit = async () => {
    try {
      await register({ ...this.state.data });
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
      // if (error.response.status === "400")
      //   this.setState({ errors: { email: error.message } });
    }
  };
  render() {
    const { errors } = this.state;
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="card-wrapper">
        <h4 className="font-weight-light text-center mb-4">Demo CRM</h4>
        <div className="card p-3">
          <div className="alert alert-info alert-sm">
            Register for a new local account
          </div>

          <form onSubmit={this.submitHandler}>
            <FormGroup
              name="name"
              placeholder="Name"
              error={errors}
              onChange={this.inputChangeHandler}
            />
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
              Register
            </button>
          </form>
          <p className="small mb-0 mt-2">
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
