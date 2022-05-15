import classNames from "classnames";

const Input = ({ className, label, ...rest }) => {
  const classes = classNames(className);
  const labelClasses = classNames("");

  return label ? (
    <label className={labelClasses}>
      <span>{label}</span>

      <input className={classes} {...rest} />
    </label>
  ) : (
    <input className={classes} {...rest} />
  );
};

export default Input;
