import { useEffect } from "react";
import type { City } from "@/types";
import styles from "./City.module.css";
import formateDate from "@/utils/formatDate";
import { useCities } from "@/hooks/useCities";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

export default function City() {
  const { getCity, currentCity, isLoading } = useCities();

  const { id } = useParams();

  useEffect(() => {
    getCity(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        <p>{formateDate(currentCity?.date)}</p>
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer">
          Check out {currentCity?.cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton />
      </div>
    </div>
  );
}
