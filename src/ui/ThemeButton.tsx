import { useEffect, useState } from "react";

export default function ThemeButton() {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    const prefersNotSet = window.matchMedia(
      "(prefers-color-scheme: no-preference)"
    ).matches;

    // Media Hook to check what theme user prefers
    if (prefersDark) {
      setDark(true);
    }

    if (prefersLight) {
      setDark(false);
    }

    if (prefersNotSet) {
      document.querySelector("html")?.classList.remove("dark");
      document.querySelector("html")?.classList.remove("light");
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.querySelector("html")?.classList.add("dark");
      document.querySelector("html")?.classList.remove("light");
    } else {
      document.querySelector("html")?.classList.remove("dark");
      document.querySelector("html")?.classList.add("light");
    }
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)}>{dark ? "Light" : "Dark"}</button>
  );
}
