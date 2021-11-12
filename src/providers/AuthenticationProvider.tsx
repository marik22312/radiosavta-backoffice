import React, { useState } from "react";
import { useEffect } from "react";
import { User } from "../domain/Users";
import { useLoggedInUser } from "../hooks/auth/useLoggedInUser";
import { cookieOven } from "../services/CookieOven";
import { setToken } from "../services/http.client";

interface AuthenticationContext {
  authToken?: string;
  setAuthToken: (token: string) => void;
  user?: User;
}
const AuthContext = React.createContext<AuthenticationContext | null>(null);

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("Missing Auth Provider!");
  }

  return context;
};

export const AuthenticaitonProvider: React.FC = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | undefined>(
    cookieOven.eatCookie("auth")
  );
  useEffect(() => {
    if (authToken) {
      setToken(authToken);
    }
  }, [authToken]);
  const { user } = useLoggedInUser({ enabled: !!authToken });

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};
