import * as React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  classes?: string;
}

const Form = ({ children, classes, ...rest }: FormProps) => {
  const className = ["flex flex-col space-y-8 w-full max-w-xs"];
  if (classes) className.push(classes);
  return (
    <form className={className.join(" ")} {...rest}>
      {children}
    </form>
  );
};

export default Form;
