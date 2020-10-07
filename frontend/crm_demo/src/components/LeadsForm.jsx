import React from "react";
import Form from "./shared/Form";
import FormGroup from "./shared/FormGroup";
import leadService from "../services/lead.service";
import _ from "lodash";
import Joi from "joi";
import { Link } from "react-router-dom";
class LeadForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      phone: "",
    },
    errors: {},
  };
  schema = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    phone: Joi.number().allow(""),
  });

  async populateLead() {
    try {
      const paramId = this.props.match.params.id;
      if (paramId !== "new") {
        let { data } = await leadService.getLead(paramId);
        let lead = _.pick(data, ["name", "email", "phone"]);
        this.setState({ data: lead });
      }
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateLead();
  }

  doSubmit = async () => {
    try {
      const paramId = this.props.match.params.id;
      if (paramId === "new") {
        await leadService.addLead(this.state.data);
        this.props.history.replace("/leads");
      } else {
        await leadService.updateLead(paramId, this.state.data);
        this.props.history.replace("/leads");
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  render() {
    const { name, email, phone } = this.state.data;
    const { errors } = this.state;

    return (
      <React.Fragment>
        <h3 className="mt-3">Lead information</h3>
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
            <FormGroup
              name="phone"
              label="Phone"
              onChange={this.inputChangeHandler}
              value={phone}
              error={errors}
            />
            <div className="btn-group btn-group-sm w-100">
              <Link to="/leads" className="btn btn-danger ">
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

export default LeadForm;
