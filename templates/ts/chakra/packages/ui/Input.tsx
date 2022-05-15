import * as Chakra from "@chakra-ui/react";

interface InputProps extends Chakra.InputProps {
  label?: string;
}

const Input = ({ label, ...rest }: InputProps) => {
  return (
    <Chakra.FormControl>
      {label && <Chakra.FormLabel>{label}</Chakra.FormLabel>}
      <Chakra.Input {...rest} />
    </Chakra.FormControl>
  );
};

export default Input;
