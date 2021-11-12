import React, { useState } from "react";
import { User } from "../domain/Users";

interface AuthenticationContext {
  authToken?: string;
  setAuthToken: (token: string) => void;
  user?: User;
  setUser: (user: User) => void;
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
  const [authToken, setAuthToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | undefined>();

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
