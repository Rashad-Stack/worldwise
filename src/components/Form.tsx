// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";

type State = {
  cityName: string;
  country: string;
  date: string;
  notes: string;
};

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const initialState: State = {
  cityName: "",
  country: "",
  date: "",
  notes: "",
};

export default function Form() {
  const [state, setState] = useState<State>(initialState);

  const handleChanged = (e: Event) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          name="cityName"
          id="cityName"
          onChange={handleChanged}
          value={state.cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
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
        <button>Add</button>
        <button>&larr; Back</button>
      </div>
    </form>
  );
}
