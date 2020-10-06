import { Component } from "react";

class Form extends Component {
  inputChangeHandler = ({ target }) => {
    const { data } = this.state;
    data[target.name] = target.value;
    this.setState({ data });
  };
  validate = () => {
    return this.schema.validate(this.state.data);
  };
  submitHandler = e => {
    e.preventDefault();
    const { error } = this.validate();
    if (error) {
      console.log("there is error", error);
      console.log(error.details[0]);
      const e = { [error.details[0].path[0]]: error.details[0].message };
      this.setState({ errors: e });
      return null;
    }
    this.setState({ errors: {} });
    this.doSubmit();
  };
}

export default Form;
