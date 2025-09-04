import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProps } from "./AuthContextProps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../service/AuthService";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
const useAuth = () => useContext(AuthContext);

const authService = new AuthService();

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("@token");

      if (!token) return;

      const isValidToken = await authService.getUserData(token);

      if (!isValidToken) {
        logout();
        return;
      }

      setToken(token);
    };
    loadToken();
  }, []);

  const [token, setToken] = useState<string | null>(null);

  const loginWithEmailAndPassword = async (idToken: string) => {
    setToken(idToken);
    await AsyncStorage.setItem("@token", idToken);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("@token");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated: !!token,
        loginWithEmailAndPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
