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

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const salvarDados = async () => {
    if (
      !nome.trim() ||
      !email.trim() ||
      !telefone.trim() ||
      !senha ||
      senha !== confirmarSenha
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    const userData = {
      nome,
      email,
      telefone,
      senha,
    };

    try {
      const usuariosJSON = await AsyncStorage.getItem("usuarios");
      let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

      const emailExistente = usuarios.some((u) => u.email === email);
      if (emailExistente) {
        Alert.alert("Erro", "E-mail já cadastrado.");
        return;
      }

      usuarios.push(userData);
      await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));

      Alert.alert("Sucesso", "Conta cadastrada com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Criar Conta</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>

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
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(99) 99999-9999"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
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

        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={salvarDados}>
          <Text style={styles.buttonText}>Cadastrar Conta</Text>
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
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#be7ccc",
    marginBottom: 20,
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
});
