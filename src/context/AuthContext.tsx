import React, { createContext, useContext, useState } from "react";
import { AuthContextProps } from "./AuthContextProps";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  const login = async () => {};

  const logout = async () => {};

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
