import classNames from "classnames";
import { useTheme } from "next-themes";
import * as React from "react";

const themes = ["light", "dark"];

const ThemeButton = ({ className }) => {
  const classes = classNames(className);

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
      {theme === themes[1] ? (
        <BsBrightnessHigh className="w-4 h-4" />
      ) : (
        <BsMoonFill className="w-4 h-4" />
      )}
    </button>
  );
};

export default ThemeButton;
