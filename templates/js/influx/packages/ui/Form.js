import classNames from "classnames";

const Form = ({ children, className, ...rest }) => {
  const classes = classNames("form", className);

  return (
    <form className={classes} {...rest}>
      {children}
    </form>
  );
};

export default Form;
