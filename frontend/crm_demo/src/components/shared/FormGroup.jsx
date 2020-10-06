import React from "react";
const FormGroup = ({ label, name, onChange, error, type, ...rest }) => {
  return (
    <div className="form-group custom">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type || "text"}
        className={`form-control  ${error && error[name] && "border-danger"}`}
        id={name}
        name={name}
        onChange={onChange}
        {...rest}
      />
      {error && error[name] && <div className="error">{error[name]}</div>}
    </div>
  );
};

export default FormGroup;
