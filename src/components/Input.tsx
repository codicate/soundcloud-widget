import styles from "./Input.module.scss";
import { useRef } from "react";
import cn from "classnames";

export interface InputOptions {
  type?: string,
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;

  option?: "input" | "textarea";
  label?: string;
  defaultValue?: string,
  selectAllOnFocus?: boolean;
}

export type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

const Input = ({
  changeHandler,
  label,
  value,
  option,
  selectAllOnFocus,
  ...props
}: {
  changeHandler?: ChangeHandler;
  name?: string;
  label?: string;
  value: string;
} & InputOptions
) => {
  const InputOrTextarea = option || "input";
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  return (
    <div className={styles.group}>
      {
        label && (
          <label
            className={cn({ [styles.shrink]: value })}
          >
            {label}
          </label>
        )
      }
      <InputOrTextarea
        ref={inputRef}
        className={(
          option === "textarea"
        ) ? styles.textarea
          : styles.input
        }
        onChange={changeHandler}
        {...((selectAllOnFocus) && {
          onFocus: () => inputRef.current?.select()
        })}
        {...props}
      />
    </div>
  );
};

export default Input;
