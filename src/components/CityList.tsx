import type { City } from "@/types";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

type Props = {
  cities: City[];
  loading: boolean;
};

export default function CityList({ cities, loading }: Props): JSX.Element {
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
