import styles from "./Input.module.scss";
import { useRef } from "react";

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
  readOnly,
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
          <label>
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
        {...((
          selectAllOnFocus
        ) && {
          onFocus: () => inputRef.current?.select()
        })}
        {...((
          readOnly
        ) && {
          readOnly: true
        })}
        {...props}
      />
    </div>
  );
};

export default Input;
