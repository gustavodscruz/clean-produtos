import { useState } from "react";
import { AuthEmailPassword } from "../model/Auth";
import { useAuth } from "../context/AuthContext";
import AuthService from "../service/AuthService";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProps } from "../navigators/AuthNavigator";

const authService = new AuthService();

const useAuthControl = () => {
  const { loginWithEmailAndPassword } = useAuth();

  const [authErrors, setAuthErrors] = useState<Partial<AuthEmailPassword>>({});
  const [authEmailPassword, setAuthEmailPassword] = useState<
    Partial<AuthEmailPassword>
  >({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isAuthEmailPassword = (
    obj: Partial<AuthEmailPassword>
  ): obj is AuthEmailPassword => {
    return obj.email !== undefined && obj.password !== undefined;
  };

  const login = async () => {
    setLoading(true);

    if (!isAuthEmailPassword(authEmailPassword)) return null;

    const response = await authService.loginWithEmailAndPassword(
      authEmailPassword
    );

    if (response.message) {
      setMessage(message);
    }

    if (response.errors) {
      setAuthErrors(response.errors);
      setLoading(false);
      return null;
    }

    if (!response.success || !response.data) {
      setLoading(false);
      return null;
    }

    await loginWithEmailAndPassword(response.data?.idToken);

    setLoading(false);
  };

  const signup = async () => {
    setLoading(true);

    if (!isAuthEmailPassword(authEmailPassword)) return null;

    const response = await authService.signUpWithEmailAndPassword(
      authEmailPassword
    );

    if (response.message) {
      setMessage(message);
    }

    if (response.errors) {
      setAuthErrors(response.errors);
      setLoading(false);
      return null;
    }

    if (!response.success || !response.data) {
      setLoading(false);
      return null;
    }

    await loginWithEmailAndPassword(response.data?.idToken);

    setLoading(false);
  };

  const handleAuthEmailPassword = (
    value: string,
    field: keyof AuthEmailPassword
  ) => {
    setAuthEmailPassword((authEmailPassword) => ({
      ...authEmailPassword,
      [field]: value,
    }));
  };

  return {
    authErrors,
    handleAuthEmailPassword,
    login,
    loading,
    authEmailPassword,
    message,
    signup,
  };
};

export default useAuthControl;
