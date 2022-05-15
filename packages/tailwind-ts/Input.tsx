import classNames from "classnames";
import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Input = ({ className, label, ...rest }: InputProps) => {
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
