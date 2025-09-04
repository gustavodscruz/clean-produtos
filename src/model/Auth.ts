import { object, Schema, string } from "yup";

interface AuthResponse {
  data?: FirebaseTokenResponse;
  success: boolean;
  message: string;
  errors?: Partial<AuthEmailPassword>
}

interface FirebaseTokenResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
}

interface AuthEmailPassword {
  email: string;
  password: string;
}

const authEmailPasswordSchema: Schema<AuthEmailPassword> = object({
  email: string().email("Digite um email válido").required(),
  password: string().min(6, "Digite uma senha com no mínimo 6 caracteres").required(),
});

export {
  AuthResponse,
  FirebaseTokenResponse,
  AuthEmailPassword,
  authEmailPasswordSchema,
};
