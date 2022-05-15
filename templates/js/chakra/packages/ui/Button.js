const Button = ({ children, ...rest }) => {
  return (
    <Chakra.Button colorScheme="purple" {...rest}>
      {children}
    </Chakra.Button>
  );
};

export default Button;
