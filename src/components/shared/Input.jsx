function Input({ type, name, label, error, ...rest }) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type ? type : "text"}
        {...rest}
        name={name}
        id={name}
        maxLength={100}
        required
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
