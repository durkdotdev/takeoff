import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classes?: string | undefined;
  label: string;
}

const Input = ({ classes, label, ...rest }: InputProps) => {
  const className = ["flex flex-col space-y-2"];
  if (classes) className.push(classes);
  const inputClassName = [
    "px-4 py-3 w-full max-w-xs text-sm border border-black rounded-lg shadow-lg shadow-fuchsia-400/60"
  ];
  return (
    <div className={className.join(" ")}>
      <label className="font-extralight text-sm uppercase">
        <span>{label}</span>
      </label>
      <input className={inputClassName.join(" ")} {...rest} />
    </div>
  );
};

export default Input;
