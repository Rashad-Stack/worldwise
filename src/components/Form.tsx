// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import useUrlPosition from "@/hooks/useUrlPosition";
import { convertToEmoji } from "@/utils/ConvertToEmoji";
import Message from "./Message";
import Spinner from "./Spinner";

type State = {
  isLoading: boolean;
  error: string | null | unknown;
  cityName: string;
  country: string;
  date: string;
  notes: string;
  emoji: string;
};

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const initialState: State = {
  isLoading: false,
  error: null,
  cityName: "",
  country: "",
  date: new Date().toDateString(),
  notes: "",
  emoji: "",
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function Form() {
  const [state, setState] = useState<State>(initialState);
  const { lat, lng } = useUrlPosition();

  const handleChanged = (e: Event) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCities() {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode) {
            throw new Error(
              "That doesn't seems to be a city, click some where else 😉"
            );
          }
          setState((prev) => ({
            ...prev,
            cityName: data.city || data.locality || "",
            country: data.countryName,
            emoji: convertToEmoji(data.countryCode),
          }));
        } catch (error: unknown) {
          if (error instanceof Error) {
            setState((prev) => ({ ...prev, error }));
          } else {
            setState((prev) => ({
              ...prev,
              error: "An unknown error occurred. Please try again.",
            }));
          }
        } finally {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      }
      fetchCities();
    },
    [lat, lng]
  );

  function handleSubmit(event: Event) {
    event.preventDefault();
  }

  if (!lat && !lng)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  if (state.isLoading) return <Spinner />;

  if (state.error) return <Message message={state.error.toString()} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          name="cityName"
          id="cityName"
          onChange={handleChanged}
          value={state.cityName}
        />
        <span className={styles.flag}>{state.emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {state.cityName}?</label>
        <input
          name="date"
          id="date"
          onChange={handleChanged}
          value={state.date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {state.cityName}</label>
        <textarea
          name="notes"
          id="notes"
          onChange={handleChanged}
          value={state.notes}
        />
      </div>

      <div className={styles.buttons}>
        <button type="submit">Add</button>
        <BackButton />
      </div>
    </form>
  );
}
