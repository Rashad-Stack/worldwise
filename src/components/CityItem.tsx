import type { City } from "@/types";
import styles from "./CityItem.module.css";
import formateDate from "@/utils/formatDate";
import { Link } from "react-router-dom";
import { useCities } from "@/hooks/useCities";

type Props = {
  city: City;
};

export default function CityItem({ city }: Props) {
  const { current } = useCities();
  const { id, cityName, emoji, date, position } = city || {};
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === current?.id ? styles["cityItem--active"] : ""
        }`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formateDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
