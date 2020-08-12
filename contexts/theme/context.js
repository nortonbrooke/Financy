import { createContext } from "react";
import { themes } from "./themes.js";

export const ThemeContext = createContext(themes.light);

export const ThemeProvider = ThemeContext.Provider;
