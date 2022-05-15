import classNames from "classnames";
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  const classes = classNames("btn btn-primary", className);

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
