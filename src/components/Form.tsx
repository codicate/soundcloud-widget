import styles from "./Form.module.scss";
import { useState } from "react";
import cn from "classnames";

import Input, { InputOptions, ChangeHandler } from "./Input";


function Form<
  T extends Record<string, InputOptions>
>({
  submitFn,
  inputItems,
  children,
  className,
  ...props
}: {
  submitFn?: (inputItems: Record<keyof T, string>) => void | Promise<void>;
  inputItems: T;
  children?: React.ReactNode;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLFormElement>, HTMLFormElement>
) {

  const defaultItems = Object.assign(
    Object.entries(inputItems).map(([name, value]) => ({
      [name]: value.defaultValue || ""
    }))
  );

  const [input, setInput] = useState(defaultItems);

  const changeHandler: ChangeHandler = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitFn?.(input);
    setInput(defaultItems);
  };

  return (
    <form
      className={cn(styles.form, className)}
      onSubmit={submitHandler}
      {...props}
    >
      <div className={styles.inputs}>
        {
          Object.entries(inputItems).map(([name, value], idx) => (
            <Input
              key={idx}
              changeHandler={changeHandler}
              name={name}
              value={input[name]}
              {...value}
            />
          ))
        }
      </div>
      {children}
    </ form>
  );
}

export default Form;
