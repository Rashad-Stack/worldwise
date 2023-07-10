import type { City } from "@/types";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryItem.module.css";
import CountryItem from "./CountryItem";

type Props = {
  cities: City[];
  loading: boolean;
};

export default function CountryList({ cities, loading }: Props): JSX.Element {
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries: City[] = cities.reduce((arr: City[], city: City): City[] => {
    if (!arr.map((el) => el.cityName).includes(city.country)) {
      return [...arr, { ...city, country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country: City) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}
