import type { User } from "@/types";
import styles from "./User.module.css";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
