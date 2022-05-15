import * as React from "react";

import IconContainer from "./IconContainer";

interface PoleProps {
  children?: React.ReactNode;
  className: string;
}

const Pole = ({ children, className }: PoleProps) => {
  return (
    <div className={className}>
      <div className="mx-auto h-24 w-[1px] bg-black" />
      <IconContainer classes="mx-auto shadow-lg shadow-fuchsia-400/80">
        {children}
      </IconContainer>
    </div>
  );
};

export default Pole;
