import classNames from "classnames";

const Button = ({ children, className, ...rest }) => {
  const classes = classNames(className);

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
