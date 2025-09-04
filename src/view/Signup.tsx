import {
    ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useAuthControl from "../control/AuthController";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProps } from "../navigators/AuthNavigator";

const SignUp = () => {
  const {
    signup,
    message,
    authEmailPassword,
    authErrors,
    handleAuthEmailPassword,
    loading
  } = useAuthControl();

  const navigation = useNavigation<AuthNavigationProps<"Signup">>();
  const navigateToLogin = () => {
    navigation.goBack();
  };

  if (loading) return <ActivityIndicator size={"large"} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={authEmailPassword.email}
        onChangeText={(value) => handleAuthEmailPassword(value, "email")}
      />
      {authErrors.email && (
        <Text style={styles.errorText}>{authErrors.email}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={authEmailPassword.password}
        onChangeText={(value) => handleAuthEmailPassword(value, "password")}
        secureTextEntry
      />
      {authErrors.password && (
        <Text style={styles.errorText}>{authErrors.password}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={signup}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      {message && <Text>{message}</Text>}
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    color: "#007bff",
    marginTop: 20,
    fontSize: 16,
  },
});

export default SignUp;