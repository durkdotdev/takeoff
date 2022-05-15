import * as React from "react";

interface AlertProps {
  children: React.ReactNode;
}

const Alert = ({ children }: AlertProps) => {
  return (
    <div className="p-4 text-white bg-black rounded-lg shadow-lg shadow-fuchsia-400">
      {children}
    </div>
  );
};

export default Alert;
