import classNames from "classnames";
import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Input = ({ className, label, ...rest }: InputProps) => {
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
