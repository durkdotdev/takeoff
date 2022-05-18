import classNames from "classnames";
import * as React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

const Form = ({ children, className, ...rest }: FormProps) => {
  const classes = classNames("form", className);

  return (
    <form className={classes} {...rest}>
      {children}
    </form>
  );
};

export default Form;
