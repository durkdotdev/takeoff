import * as React from "react";

interface CardProps {
  children: React.ReactNode;
  classes?: string;
}

const Card = ({ children, classes }: CardProps) => {
  const className = [
    "p-8 bg-white border border-black rounded-lg shadow-lg shadow-fuchsia-400/60"
  ];
  if (classes) className.push(classes);
  return <div className={className.join(" ")}>{children}</div>;
};

export default Card;
