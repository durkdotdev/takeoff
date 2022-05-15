import classNames from "classnames";

const Input = ({ className, label, ...rest }) => {
  const classes = classNames("form-control", className);

  return (
    <div className={classes}>
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <input className="input" {...rest} />
    </div>
  );
};

export default Input;
