import { Feather } from "@expo/vector-icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Platform,
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

type FormData = {
  username?: string;
  email: string;
  password: string;
};

function mostrarAlerta(titulo: string, mensagem: string) {
  if (Platform.OS === "web") {
    window.alert(`${titulo}: ${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

const LoginForm: React.FC<LoginFormProps> = ({
  isRegistering,
  onLogin,
  onRegister,
  loading,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (isRegistering) {
        await onRegister(data.username!, data.email, data.password);
      } else {
        await onLogin(data.email, data.password);
      }
      reset();
    } catch (err: any) {
      const msg =
        err.response?.data?.mensagem || err.message || "Ocorreu um erro";
      mostrarAlerta("Erro", msg);
    }
  };

  return (
    <View>
      {isRegistering && (
        <>
          <View style={styles.inputGroup}>
            <Feather name="user" size={20} color="#666" style={styles.icon} />
            <Controller
              control={control}
              name="username"
              rules={{ required: "Usuário é obrigatório" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Usuário"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}
        </>
      )}

      <View style={styles.inputGroup}>
        <Feather name="mail" size={20} color="#666" style={styles.icon} />
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email é obrigatório",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Digite um email válido",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
      </View>
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <View style={styles.inputGroup}>
        <Feather name="lock" size={20} color="#666" style={styles.icon} />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Senha é obrigatória",
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 caracteres",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      {/* Botão */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
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
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
});
