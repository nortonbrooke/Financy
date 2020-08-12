import { createContext } from "react";
import { app } from "./app.js";

export const AppContext = createContext(app);

export const AppProvider = AppContext.Provider;
