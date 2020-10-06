import React from "react";
import Form from "./shared/Form";
import FormGroup from "./shared/FormGroup";
import _ from "lodash";
import Joi from "joi";
import { Link } from "react-router-dom";
import usersService from "../services/users.service";
import Select from "./shared/Select";
class UserForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      role: "",
    },
    errors: {},
  };
  schema = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    role: Joi.string().required().valid("basic", "staff", "admin"),
  });

  async populateUser() {
    try {
      const paramId = this.props.match.params.id;
      if (paramId !== "new") {
        let { data } = await usersService.getUser(paramId);
        console.log(data, "sss");
        let user = _.pick(data, ["name", "email", "role"]);
        console.log(data, user);
        this.setState({ data: user });
      }
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateUser();
  }

  doSubmit = async () => {
    try {
      const paramId = this.props.match.params.id;
      if (paramId === "new") {
        await usersService.addUser(this.state.data);
      } else {
        await usersService.updateUser(paramId, this.state.data);
      }
      this.props.history.replace("/users");
    } catch (ex) {
      console.log(ex);
    }
  };
  render() {
    const { name, email, role } = this.state.data;
    const { errors } = this.state;

    return (
      <React.Fragment>
        <h3 className="mt-3">User information</h3>
        <div className="card w-50 p-3 mt-4">
          <form onSubmit={this.submitHandler}>
            <FormGroup
              name="name"
              label="Name"
              onChange={this.inputChangeHandler}
              value={name}
              error={errors}
            />
            <FormGroup
              name="email"
              label="Email"
              onChange={this.inputChangeHandler}
              value={email}
              error={errors}
            />
            <Select
              name="role"
              label="Role"
              options={["basic", "staff", "admin"]}
              onChange={this.inputChangeHandler}
              value={role}
              error={errors}
            />
            <div className="btn-group btn-group-sm w-100">
              <Link to="/users" className="btn btn-danger ">
                CANCEL
              </Link>
              <button type="submit" className="btn btn-success">
                SAVE
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default UserForm;
