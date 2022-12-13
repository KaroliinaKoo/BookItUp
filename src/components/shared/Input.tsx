import React from "react";

type PropTypes = {
  type: "text" | "email" | "password" | "number";
  name: string;
  label: string;
  errorMsg?: string;
  direction?: "row" | "column";
  children?: React.ReactNode;
  error?: boolean;
};

function Input({
  type,
  name,
  label,
  error = false,
  errorMsg = "Invalid input",
  onChange,
  direction = "row",
  children,
  ...rest
}: PropTypes & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`input-group ${direction}`}>
      <label htmlFor={name}>{label}</label>
      <div className="input-field-group">
        <input
          type={type}
          name={name}
          id={name}
          className={`input-field ${name} ${error ? "error" : ""}`}
          onChange={onChange}
          {...rest}
        />
        {children}
      </div>
      {error && <p className="input-error">{errorMsg}</p>}
    </div>
  );
}

export default Input;
