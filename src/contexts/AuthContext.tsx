import type { User } from "@/types";
import { createContext, useReducer } from "react";

interface Props {
  children: React.ReactNode;
}

interface ContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface State {
  user: User | null;
  isAuthenticated: boolean;
}

export enum ActionType {
  LOGIN = "user/login",
  LOGOUT = "user/logout",
}

interface Action {
  type: ActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER: User = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case ActionType.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export const AuthContext = createContext<ContextType | undefined>(undefined);

export default function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: ActionType.LOGIN, payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: ActionType.LOGOUT });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
