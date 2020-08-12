import { createContext } from "react";
import api from "./api";

export const APIContext = createContext(api);

export const APIProvider = APIContext.Provider;
