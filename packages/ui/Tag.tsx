import * as React from "react";

interface TagProps {
  children: React.ReactNode;
  classes?: string;
}

const Tag = ({ children, classes }: TagProps) => {
  const className = [
    "px-2 py-1 bg-emerald-300 font-bold text-sm border border-black rounded-lg"
  ];
  if (classes) className.push(classes);
  return <span className={className.join(" ")}>{children}</span>;
};

export default Tag;
