import * as Chakra from "@chakra-ui/react";
import * as React from "react";

interface ButtonProps extends Chakra.ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <Chakra.Button colorScheme="purple" {...rest}>
      {children}
    </Chakra.Button>
  );
};

export default Button;
