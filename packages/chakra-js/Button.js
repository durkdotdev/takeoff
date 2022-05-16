import * as Chakra from "@chakra-ui/react";

const Button = ({ children, ...rest }) => {
  return (
    <Chakra.Button colorScheme="purple" {...rest}>
      {children}
    </Chakra.Button>
  );
};

export default Button;
