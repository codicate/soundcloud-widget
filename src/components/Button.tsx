import styles from "./Button.module.scss";

function Button({
  children,
  type = "button",
  styledAs,
  className,
  ...props
}: {
  children: string;
  styledAs?: "";
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) {
  return (
    <button
      className={`
        ${styles.btn} 
        ${styledAs ? styles[styledAs] : styles.default} 
        ${className || ""}
      `}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
