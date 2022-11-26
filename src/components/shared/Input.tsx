import React from "react";

type PropTypes = {
  type?: "text" | "email" | "password" | "number";
  name: string;
  label: string;
  error?: string;
};

function Input({
  type,
  name,
  label,
  error,
  onChange,
  ...rest
}: PropTypes & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input type={type ? type : "text"} name={name} id={name} {...rest} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
