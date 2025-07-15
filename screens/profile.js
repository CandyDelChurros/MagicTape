import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const data = await AsyncStorage.getItem("usuario");
        if (data) {
          setUsuario(JSON.parse(data));
        }
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar dados do usuário.");
      }
    };

    carregarDados();
  }, []);

  if (!usuario) {
    return (
      <View style={[styles.container, styles.loading]}>
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Image
          source={require("./../assets/perfil.jpg")}
          style={styles.avatar}
        />

        <Text style={styles.name}>{usuario.nome}</Text>
        <Text style={styles.email}>{usuario.email}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          <Text style={styles.sectionText}>
            <Icon name="phone" size={14} /> {usuario.telefone || "+55 (__) _____-____"}
          </Text>
          {/* Se quiser colocar data de nascimento dinâmica, adicione ao cadastro */}
          <Text style={styles.sectionText}>
            <Icon name="cake-candles" size={14} /> 20 de Janeiro de 2000
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          <Text style={styles.sectionText}>Vila Abacate, Bairro Limoeiro, 1790</Text>
          <Text style={styles.sectionText}>Três Lagoas - MS, 79630-000</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pagamento</Text>
          <Text style={styles.sectionText}>
            <Icon name="credit-card" size={14} /> 5555 09•••••• 5555
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={async () => {
          await AsyncStorage.removeItem("usuario");
          Alert.alert("Logout", "Você saiu da conta.");
          setUsuario(null);
        }}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
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
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#be7ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#be7ccc",
  },
  email: {
    fontSize: 13,
    color: "#777",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#be7ccc",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 13,
    marginBottom: 5,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#be7ccc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    width: "50%",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
