import React, { Component } from "react";
import Table from "./shared/Table";
import { Link } from "react-router-dom";
import axios from "axios";
import leadService from "../services/lead.service";
import authService from "../services/auth.service";
class Leads extends Component {
  state = {
    leads: [],
    columns: [
      { path: "name", label: "Name" },
      { path: "phone", label: "Phone" },
      { path: "email", label: "Email" },
      {
        content: lead => this.populateActions(lead),
        key: "Actions",
      },
    ],
  };

  async componentDidMount() {
    try {
      let { data: leads } = await axios.get("/leads");
      this.setState({ leads });
    } catch (error) {
      console.log(error);
    }
  }
  deleteLead = async id => {
    const originalLeads = this.state.leads;
    try {
      let newLeads = this.state.leads.filter(lead => lead._id !== id);
      this.setState({ leads: newLeads });
      await leadService.deleteLead(id);
    } catch (err) {
      this.setState({ leads: originalLeads });
      console.log(err);
    }
  };

  populateActions(lead) {
    return (
      <div className="btn-group btn-group-sm">
        <Link className="btn btn-info" to={`/leads/${lead._id}`}>
          <i className="fas fa-pen"></i>
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.deleteLead(lead._id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    );
  }

  render() {
    const basicUser = authService.getCurrentUser().role === "basic";
    let { leads, columns } = this.state;

    if (basicUser) {
      columns = [...columns];
      columns.pop(); // to remove the actions
    }
    return (
      <section className="mt-4">
        {basicUser ? (
          <div className="alert alert-info">
            <strong>Note:</strong> Change the role to staff to be able to manage
            leads
          </div>
        ) : (
          <Link to="leads/new" className="btn btn-success mb-3">
            Add Lead
          </Link>
        )}
        <Table columns={columns} data={leads} />
      </section>
    );
  }
}

export default Leads;
