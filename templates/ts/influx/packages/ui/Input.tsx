import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Input = ({ className, label, ...rest }: InputProps) => {
  return (
    <label className="label">
      <span>{label}</span>
      <input className="input" {...rest} />
    </label>
  );
};

export default Input;
