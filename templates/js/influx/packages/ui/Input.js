const Input = ({ className, label, ...rest }) => {
  return (
    <label className="label">
      <span>{label}</span>
      <input className="input" {...rest} />
    </label>
  );
};

export default Input;
