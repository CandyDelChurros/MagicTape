import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MagicTape({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      const dados = await AsyncStorage.getItem("produtos");
      if (dados) {
        setProdutos(JSON.parse(dados));
      }
    };
    carregarProdutos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.text}>
          <Text style={styles.textTitle}>Escolha do DJ</Text>
          <Text style={styles.subtext}>
            Comece sua Coleção com essas fitas em ofertas!
          </Text>
        </View>
        <View style={styles.produtos}>
          {produtos.map((prod, i) => (
            <TouchableOpacity
              key={i}
              style={styles.produto}
              onPress={() => navigation.navigate("Detail", { id: prod.id })}
            >
              <ImageBackground
                source={prod.image}
                style={styles.produtoImg}
                resizeMode="cover"
              />
              <View style={styles.info}>
                <Text style={styles.produtoTitle}>{prod.title}</Text>
                <Text style={styles.installments}>{prod.installments}</Text>
                <Text style={styles.price}>{prod.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    flex: 1,
    alignItems: "center",
  },
  produtos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
  },
  produto: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#fdf5f8",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  produtoImg: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    padding: 8,
  },
  produtoTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 6,
    color: "#000",
  },
  installments: {
    fontSize: 12,
    color: "#8e8e8e",
  },
  text: {
    marginVertical: 15,
    width: "90%",
  },
  textTitle: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 24,
    color: "#be7ccc",
  },
  subtext: {
    fontSize: 14,
    color: "#000",
  },
  price: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
    color: "#000",
  },
});
