import { createContext } from "react";
import { AuthContextType } from "../../types";

export type { AuthContextType };
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
