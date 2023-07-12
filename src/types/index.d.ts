export type Position = {
  lat: number;
  lng: number;
};

export type City = {
  readonly id?: number;
  cityName: string;
  country: string;
  emoji: string;
  date: date;
  notes: string;
  position: Position;
};

export type User = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
