import * as Chakra from "@chakra-ui/react";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = Chakra.useColorMode();

  return (
    <Chakra.Button onClick={toggleColorMode}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Chakra.Button>
  );
};

export default ThemeButton;
