import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  classes?: string;
}

const Button = ({ children, classes, ...rest }: ButtonProps) => {
  const className = [
    "px-4 py-3 w-full bg-indigo-200 hover:bg-indigo-300 border border-black font-bold text-sm text-center rounded-lg uppercase shadow-lg shadow-fuchsia-400/40"
  ];
  if (classes) className.push(classes);
  return (
    <button className={className.join(" ")} {...rest}>
      {children}
    </button>
  );
};

export default Button;
