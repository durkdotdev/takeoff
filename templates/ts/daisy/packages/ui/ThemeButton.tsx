import classNames from "classnames";
import { useTheme } from "next-themes";
import * as React from "react";
import { BsBrightnessHigh, BsMoonFill } from "react-icons/bs";

interface ThemeButtonProps {
  className?: string;
  themes?: readonly [string, string];
}

const ThemeButton = ({
  className,
  themes = ["light", "dark"]
}: ThemeButtonProps) => {
  const classes = classNames(
    "swap swap-rotate btn btn-ghost rounded-box",
    className
  );

  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === themes[0] ? themes[1] : themes[0]);
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-4 h-4" />;

  return (
    <button
      aria-label="Change Theme Button"
      className={classes}
      onClick={toggleTheme}
    >
      <span className={theme === themes[1] ? "swap-off" : "swap-on"}>
        <BsBrightnessHigh className="w-4 h-4" />
      </span>

      <span className={theme === themes[1] ? "swap-on" : "swap off"}>
        <BsMoonFill className="w-4 h-4" />
      </span>
    </button>
  );
};

export default ThemeButton;
