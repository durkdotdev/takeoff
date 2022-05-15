import * as React from "react";

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  classes?: string | undefined;
  label: string;
}

const Select = ({ children, classes, label, ...rest }: SelectProps) => {
  const className = ["flex flex-col items-center space-y-2 w-full"];
  if (classes) className.push(classes);
  const selectClassName = [
    "px-4 py-3 w-full max-w-xs bg-black text-white text-sm rounded-l-lg shadow-lg shadow-fuchsia-400/60 focus:outline-none"
  ];
  return (
    <div className={className.join(" ")}>
      <label className="w-full max-w-xs text-sm uppercase font-extralight">
        <span>{label}</span>
      </label>
      <div className="flex justify-center w-full">
        <select className={selectClassName.join(" ")} {...rest}>
          {children}
        </select>
        <div className="w-4 h-full bg-black rounded-r-lg shadow-r-lg shadow-fuchsia-400" />
      </div>
    </div>
  );
};

export default Select;
