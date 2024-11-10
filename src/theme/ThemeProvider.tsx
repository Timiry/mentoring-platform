import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  PaletteMode,
  Theme,
  ThemeProvider as MaterialThemeProvider,
} from "@mui/material";

import globalTheme from ".";

interface ThemeContext {
  theme: Theme;
  changeTheme: (mode: PaletteMode) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContext | null>(null);

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [themeMode, setThemeMode] = useState(
    (localStorage.getItem("theme") as PaletteMode) || "light"
  );

  const theme = useMemo(() => globalTheme(themeMode), [themeMode]);

  const changeTheme = useCallback((mode: PaletteMode) => {
    setThemeMode(mode);
    localStorage.setItem("theme", mode);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
