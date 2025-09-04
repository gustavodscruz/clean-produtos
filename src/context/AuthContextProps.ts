interface AuthContextProps {
  token: string | null;
  setToken: (token : string) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export { AuthContextProps };
