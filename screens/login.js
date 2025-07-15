import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = async () => {
    if (!email.trim() || !senha) {
      Alert.alert("Erro", "Preencha e-mail e senha.");
      return;
    }

    try {
      const usuariosJSON = await AsyncStorage.getItem("usuarios");
      const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

      const usuarioEncontrado = usuarios.find(
        (user) => user.email === email && user.senha === senha
      );

      if (usuarioEncontrado) {
        navigation.navigate("Main");
      } else {
        Alert.alert("Erro", "E-mail ou senha inválidos.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao acessar dados.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Bem-vindo de volta</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={fazerLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf5f8",
  },
  main: {
    alignItems: "center",
    paddingBottom: 30,
    marginTop: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#be7ccc",
    marginBottom: 30,
  },
  formGroup: {
    width: "90%",
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
    color: "#444",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#be7ccc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    marginTop: 20,
    fontSize: 13,
    color: "#888",
    textDecorationLine: "underline",
  },
});
