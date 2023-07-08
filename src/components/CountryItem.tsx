import styles from "./CountryItem.module.css";

interface Country {
  emoji: string;
  country: string;
}

type props = {
  country: Country;
};

export default function CountryItem({ country }: props) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}
