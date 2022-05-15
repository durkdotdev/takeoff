const Input = ({ label, ...rest }) => {
  return (
    <Chakra.FormControl>
      {label && <Chakra.FormLabel>{label}</Chakra.FormLabel>}
      <Chakra.Input {...rest} />
    </Chakra.FormControl>
  );
};

export default Input;
