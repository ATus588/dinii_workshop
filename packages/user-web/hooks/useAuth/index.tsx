import { createContext } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useState } from "react";

type AuthContextType = {
  token: string | null;
  userId: string | null;
  updateToken: (token: string | null, userId: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({ token: null, userId: null, updateToken: () => {} });

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState(typeof window !== "undefined" ? localStorage.getItem("token") : null);
  const [userId, setUserId] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("userId") : null);

  const updateToken = useCallback((token: string | null, userId: string | null) => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId ?? "");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
    setToken(token);
    setUserId(userId);
  }, []);

  return <AuthContext.Provider value={{ token, userId, updateToken }}>{children}</AuthContext.Provider>;
};
