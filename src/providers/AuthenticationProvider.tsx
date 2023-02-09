import React, { useState } from "react";
import { useEffect } from "react";
import { authenticateV3, loginV3 } from "../api/Auth.api";
import { LoginProvider } from "../domain/Auth";
import { User, RoleNames } from "../domain/Users";
import { useLoggedInUser } from "../hooks/auth/useLoggedInUser";
import { FeatureFlags, useFeatureFlags } from "../hooks/useFeatureFlags";
import { cookieOven } from "../services/CookieOven";
import { setToken } from "../services/http.client";
import { getMagicAuthToken, loginWithEmailOTP } from "../services/MagicLink";

interface LoginArgs {
  provider: LoginProvider;
  email: string;
  password?: string;
}
interface AuthenticationContext {
  authToken?: string;
  setAuthToken: (token: string) => void;
  loginProvider?: string;
  setLoginProvider: (provider: string) => void;
  user?: User;
  roles: RoleNames[];
  login: (args: LoginArgs) => Promise<void>;
  authenticate: () => Promise<void>;
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
  const { isFeatureEnabled } = useFeatureFlags([
    FeatureFlags.PASSWORDLESS_LOGIN,
  ]);

  const [authToken, setAuthToken] = useState<string>();
  const [loginProvider, setLoginProvider] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { user, roles, setLoggedInUser } = useLoggedInUser({
    enabled: !!authToken,
  });

  const setCredentials = ({
    token,
    provider,
    user,
  }: {
    token: string;
    provider: LoginProvider;
    user: User;
  }) => {
    setAuthToken(token);
    setLoginProvider(provider);
    setLoggedInUser(user);
    setToken(token);
    setLoggedInUser(user);
    localStorage.setItem("token", token);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setToken(token);
      authenticate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (args: LoginArgs) => {
    if (args.provider === LoginProvider.EMAIL) {
      try {
        const { data } = await loginV3({
          provider: LoginProvider.EMAIL,
          email: args.email,
          password: args.password,
        });

        setCredentials({
          ...data,
          provider: LoginProvider.EMAIL,
        });
        return;
      } catch (error) {
        setErrorMessage("Failed to login with email");
      }
    }
    const magicToken = await loginWithEmailOTP(args.email);
    if (!magicToken) {
      setErrorMessage("Failed to login with OTP");
      return;
    }

    try {
      const { data } = await loginV3({
        provider: LoginProvider.MAGIC_LINK,
        email: args.email,
        token: magicToken,
      });

      setCredentials({
        ...data,
        provider: LoginProvider.MAGIC_LINK,
      });
    } catch (error) {
      setErrorMessage("Failed to login with OTP token");
      return;
    }
  };

  const authenticate = async () => {
    try {
      const { data } = await authenticateV3();
      setCredentials({
        ...data,
        provider: LoginProvider.EMAIL,
      });
    } catch (error) {
      localStorage.removeItem("token");
      setErrorMessage("Failed to authenticate");
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        user,
        roles,
        loginProvider,
        setLoginProvider,
        login,
        authenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
