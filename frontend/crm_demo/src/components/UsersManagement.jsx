import React, { Component } from "react";
import Table from "./shared/Table";
import usersService from "../services/users.service";
import { Link } from "react-router-dom";

class UsersManagement extends Component {
  state = {
    users: [],
    columns: [
      { path: "name", label: "Name" },
      { path: "email", label: "Email" },
      { path: "role", label: "Role" },
      {
        key: "actions",
        content: user => this.populateActions(user),
        label: "Actions",
      },
    ],
  };
  populateActions(user) {
    return (
      <div className="btn-group btn-group-sm">
        <Link className="btn btn-info" to={`/users/${user._id}`}>
          <i className="fas fa-pen"></i>
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.deleteUser(user._id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    );
  }
  deleteUser = async id => {
    const originalUsers = this.state.users;
    try {
      let newUsers = this.state.users.filter(user => user._id !== id);
      this.setState({ users: newUsers });
      await usersService.deleteUser(id);
    } catch (err) {
      this.setState({ users: originalUsers });
      console.log(err);
    }
  };

  async componentDidMount() {
    try {
      const { data: users } = await usersService.getUsers();
      this.setState({ users });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { users, columns } = this.state;
    return (
      <section className="mt-4">
        <div className="alert alert-info">
          <strong>Note:</strong> Register an account and change its role to
          staff to be able to have a staff account
        </div>
        <Table columns={columns} data={users} />
      </section>
    );
  }
}

export default UsersManagement;
