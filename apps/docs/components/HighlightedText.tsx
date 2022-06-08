import * as React from "react";

interface HighlighedTextProps {
  children: React.ReactNode;
}

const HighlightedText = ({ children }: HighlighedTextProps) => {
  return (
    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-400 whitespace-nowrap">
      {children}
    </span>
  );
};

export default HighlightedText;
