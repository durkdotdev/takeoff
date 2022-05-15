import * as React from "react";

interface CalloutProps {
  children?: React.ReactNode;
}

const Callout = ({ children }: CalloutProps) => {
  return (
    <div className="my-16 flex flex-col md:flex-row space-y-16 md:space-x-16 md:!space-y-0 w-full">
      {children}
    </div>
  );
};

export default Callout;
