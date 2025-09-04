import axios, { AxiosInstance } from "axios";
import { AuthResponse, FirebaseTokenResponse } from "../model/Auth";

class AuthFetcher {
  private apiClient: AxiosInstance;
  private baseUrl: string = process.env.EXPO_PUBLIC_FIREBASE_AUTH_URL;
  private apiKey: string = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

  constructor() {
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
    });
  }
  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post(
        `${this.baseUrl}/accounts:signInWithPassword?key=${this.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      return {
        data: response.data as FirebaseTokenResponse,
        message: "Login realizado com sucesso!",
        success: true,
      };
    } catch (error) {
      return {
        message: "Login inválido!",
        success: false,
      };
    }
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post(
        `${this.baseUrl}/accounts:signUp?key=${this.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      return {
        data: response.data as FirebaseTokenResponse,
        message: "Login realizado com sucesso!",
        success: true,
      };
    } catch (error) {
      return {
        message: "Login inválido!",
        success: false,
      };
    }
  }

  //objetivo de validar token
  async getUserData(idToken: string): Promise<boolean> {
    try {
      const response = await this.apiClient.post(
        `${this.baseUrl}/accounts:lookup`,
        { idToken },
        {
          params: {
            key: this.apiKey,
          },
        }
      );

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default AuthFetcher;
