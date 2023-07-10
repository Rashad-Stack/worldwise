import type { City } from "@/types";
import styles from "./CountryItem.module.css";

type props = {
  country: City;
};

export default function CountryItem({ country: countries }: props) {
  const { emoji, country } = countries || {};

  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}
