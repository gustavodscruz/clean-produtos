import { ValidationError } from "yup";
import AuthFetcher from "../fetcher/AuthFetcher";
import {
  AuthEmailPassword,
  authEmailPasswordSchema,
  AuthResponse,
} from "../model/Auth";

class AuthService {
  private authFetcher: AuthFetcher;

  constructor() {
    this.authFetcher = new AuthFetcher();
  }

  async loginWithEmailAndPassword(
    authEmailPassword: AuthEmailPassword
  ): Promise<AuthResponse> {
    let authErrors: Partial<AuthEmailPassword> = {};
    try {
      await authEmailPasswordSchema.validate(authEmailPassword, {
        abortEarly: false,
      });
      return await this.authFetcher.loginWithEmailAndPassword(
        authEmailPassword.email,
        authEmailPassword.password
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((err: ValidationError) => {
          authErrors = {
            ...authErrors,
            [err.path as keyof typeof authErrors]: err.message,
          };
        });
      }
      return {
        message: "Email ou senha inválidos",
        success: false,
        errors: authErrors,
      };
    }
  }

  async signUpWithEmailAndPassword(authEmailPassword: AuthEmailPassword) {
    let authErrors: Partial<AuthEmailPassword> = {};

    try {
      await authEmailPasswordSchema.validate(authEmailPassword, {
        abortEarly: false,
      });
      return await this.authFetcher.signUpWithEmailAndPassword(
        authEmailPassword.email,
        authEmailPassword.password
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((err: ValidationError) => {
          authErrors = {
            ...authErrors,
            [err.path as keyof typeof authErrors]: err.message,
          };
        });
      }
      return {
        message: "Email ou senha inválidos",
        success: false,
        errors: authErrors,
      };
    }
  }

  //objetivo de validar token
  async getUserData(idToken: string): Promise<boolean> {
    return await this.authFetcher.getUserData(idToken);
  }
}

export default AuthService;
