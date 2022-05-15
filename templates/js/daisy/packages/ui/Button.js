import classNames from "classnames";

const Button = ({ children, className, ...rest }) => {
  const classes = classNames("btn btn-primary", className);

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
