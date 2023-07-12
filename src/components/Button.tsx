import { MouseEventHandler } from "react";
import styles from "./Button.module.css";
type Props = {
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: string;
};

export default function Button({ children, onClick, type }: Props) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
