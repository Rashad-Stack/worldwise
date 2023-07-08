import styles from "./Message.module.css";

type Props = {
  message: string;
};

export default function Message({ message }: Props) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}
