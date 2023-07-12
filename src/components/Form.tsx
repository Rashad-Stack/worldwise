// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import useUrlPosition from "@/hooks/useUrlPosition";
import { convertToEmoji } from "@/utils/ConvertToEmoji";
import Message from "./Message";
import Spinner from "./Spinner";
import type { City } from "@/types";
import { useCities } from "@/hooks/useCities";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

type State = {
  isLoading: boolean;
  error: string | null | unknown;
};

const initialState: State = {
  isLoading: false,
  error: null,
};

const initialInputState: City = {
  cityName: "",
  country: "",
  date: new Date(),
  notes: "",
  emoji: "",
  position: {
    lat: 0,
    lng: 0,
  },
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function Form() {
  const [state, setState] = useState<State>(initialState);
  const [inputState, setInputState] = useState<City>(initialInputState);
  const { lat, lng } = useUrlPosition();
  const { addNewCity, isLoading } = useCities();
  const navigate = useNavigate();

  function handleChanged(
    e: Date | null | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    if (typeof e !== "object" || e === null || !("type" in e)) {
      setInputState({ ...inputState, date: e });
    } else {
      setInputState({ ...inputState, [e.target.name]: e.target.value });
    }
  }

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
          setInputState((prev) => ({
            ...prev,
            cityName: data.city || data.locality || "",
            country: data.countryName,
            emoji: convertToEmoji(data.countryCode),
            position: {
              lat: data.latitude,
              lng: data.longitude,
            },
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!inputState.cityName || !inputState.date) return;
    await addNewCity(inputState);
    navigate("/app/cities");
  }

  if (!lat && !lng)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  if (state.isLoading) return <Spinner />;

  if (state.error) return <Message message={state.error.toString()} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          name="cityName"
          id="cityName"
          onChange={handleChanged}
          value={inputState.cityName}
        />
        <span className={styles.flag}>{inputState.emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {inputState.cityName}?</label>
        <DatePicker
          selected={inputState.date}
          onChange={handleChanged}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {inputState.cityName}
        </label>
        <textarea
          name="notes"
          id="notes"
          onChange={handleChanged}
          value={inputState.notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}
