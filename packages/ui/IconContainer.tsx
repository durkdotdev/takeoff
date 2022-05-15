import * as React from "react";

interface IconContainerProps {
  children: React.ReactNode;
  classes?: string;
}

const IconContainer = ({ children, classes }: IconContainerProps) => {
  const className = [
    "inline-block p-2 bg-indigo-200 border border-black rounded-full"
  ];
  if (classes) className.push(classes);
  return (
    <span className={className.join(" ")} style={{ width: "fit-content" }}>
      {children}
    </span>
  );
};

export default IconContainer;
