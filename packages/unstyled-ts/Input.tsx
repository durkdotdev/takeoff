import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...rest }: InputProps) => {
  return label ? (
    <label>
      <span>{label}</span>

      <input {...rest} />
    </label>
  ) : (
    <input {...rest} />
  );
};

export default Input;
