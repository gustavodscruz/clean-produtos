import { AuthEmailPassword, AuthResponse } from "../model/Auth";

interface AuthContextProps {
  token: string | null;
  setToken: (token : string) => void;
  loginWithEmailAndPassword: (idToken : string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export { AuthContextProps };
