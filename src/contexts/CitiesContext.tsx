import React, { useReducer, createContext, useEffect } from "react";

import type { City } from "@/types";

type Props = {
  children: React.ReactNode;
};

interface InitialState {
  isLoading: boolean;
  error: string | null | unknown;
  cities: City[];
  currentCity: City | undefined;
}

export enum ActionType {
  LOADING = "loading",
  LOAD_CITIES = "cities/loaded",
  LOAD_CITY = "city/loaded",
  ADD_CITY = "cities/created",
  DELETE_CITY = "cities/deleted",
  REJECT = "rejected",
}

type Action = {
  type: ActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
  cities: [],
  currentCity: undefined,
};

type ContextType = {
  cities: City[];
  isLoading: boolean;
  error: string | null | unknown;
  getCity(id: number): Promise<void>;
  currentCity: City | undefined;
  addNewCity(city: City): Promise<void>;
  deleteCity(id: number): Promise<void>;
};

const BASE_URL = "https://caring-piquant-son.glitch.me";

export const CitiesContext = createContext<ContextType | undefined>(undefined);

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ActionType.LOAD_CITIES:
      if (action.payload) {
        return {
          ...state,
          cities: action.payload,
          isLoading: false,
        };
      }
      return state;

    case ActionType.LOAD_CITY:
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };

    case ActionType.ADD_CITY:
      if (action.payload) {
        return {
          ...state,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
          isLoading: false,
        };
      }
      return state;

    case ActionType.DELETE_CITY:
      if (action.payload) {
        return {
          ...state,
          cities: state.cities.filter((city) => city.id !== action.payload),
          isLoading: false,
        };
      }
      return state;

    case ActionType.REJECT:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

export default function CitiesProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: ActionType.LOADING });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: ActionType.LOAD_CITIES, payload: data });
      } catch {
        dispatch({
          type: ActionType.REJECT,
          payload: "There was ana error loading data",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: number) {
    if (state.currentCity?.id === id) return;
    dispatch({ type: ActionType.LOAD_CITY });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: ActionType.LOAD_CITY, payload: data });
    } catch {
      dispatch({
        type: ActionType.REJECT,
        payload: "There was ana error loading data",
      });
    }
  }

  async function addNewCity(city: City) {
    dispatch({ type: ActionType.LOADING });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      dispatch({ type: ActionType.ADD_CITY, payload: data });
    } catch {
      dispatch({
        type: ActionType.REJECT,
        payload: "There was ana error loading data",
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: ActionType.LOADING });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: ActionType.DELETE_CITY, payload: id });
    } catch {
      dispatch({
        type: ActionType.REJECT,
        payload: "There was ana error loading data",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{ ...state, getCity, addNewCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
