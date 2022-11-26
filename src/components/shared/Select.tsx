import React from "react";

type PropTypes = {
  label: string;
  name: string;
  value?: string;
  error?: string;
  options: { value: any; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function Select({
  name,
  label,
  value,
  error,
  options,
  onChange,
  ...rest
}: PropTypes & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <select
        {...rest}
        name={name}
        id={name}
        value={value ? value : name}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Select;
