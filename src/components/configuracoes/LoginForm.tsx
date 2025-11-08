import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface LoginFormProps {
  isRegistering: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  isRegistering,
  onLogin,
  onRegister,
  loading,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (isRegistering) {
        if (!username || !email || !password) {
          Alert.alert("Atenção", "Preencha todos os campos para cadastro");
          return;
        }
        await onRegister(username, email, password);
      } else {
        if (!email || !password) {
          Alert.alert("Atenção", "Digite email e senha");
          return;
        }
        await onLogin(email, password);
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.mensagem || err.message || "Ocorreu um erro";
      Alert.alert("Erro", msg);
    }
  };

  return (
    <View>
      {isRegistering && (
        <View style={styles.inputGroup}>
          <Feather name="user" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      )}
      <View style={styles.inputGroup}>
        <Feather name="mail" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputGroup}>
        <Feather name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>
            {isRegistering ? "Cadastrar" : "Login"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
