import React from "react";

type PropTypes = {
  label: string;
  error: string;
};

function Input({
  type,
  name,
  label,
  value,
  error,
  ...rest
}: PropTypes & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type ? type : "text"}
        {...rest}
        name={name}
        id={name}
        value={value}
        maxLength={100}
        required
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
