import { IoRocketSharp } from "react-icons/io5";

import IconContainer from "./IconContainer";

interface LogoProps {
  theme?: "dark" | "light";
}

const Logo = ({ theme = "dark" }: LogoProps) => {
  const className = ["shadow-lg shadow-fuchsia-400/60"];
  className.push(
    theme === "dark"
      ? "group-hover:bg-indigo-300"
      : "bg-white group-hover:bg-neutral-100"
  );
  return (
    <div className="flex items-center space-x-4 group">
      <IconContainer classes={className.join(" ")}>
        <IoRocketSharp className="w-4 h-4" />
      </IconContainer>
      <span className="font-bold">TAKEOFF</span>
    </div>
  );
};

export default Logo;
