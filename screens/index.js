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
import Icon from "react-native-vector-icons/FontAwesome6";

export default function MagicTape({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      const data = await AsyncStorage.getItem("produtos");
      if (data) {
        setProdutos(JSON.parse(data));
      }
    };
    carregarProdutos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => navigation.navigate("Choice")}>
          <ImageBackground
            source={require("./../assets/banner.png")}
            style={styles.banner}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.text}>
          <Text style={styles.textTitle}>Destaques da Semana</Text>
        </View>

        <View style={styles.produtos}>
          {produtos.slice(0, 4).map((prod, i) => (
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

        <View style={styles.text}>
          <Text style={styles.textTitle}>Busque Por Generos Musicais</Text>
        </View>

        <View style={styles.generos}>
          {[
            { name: "Rock", icon: "hand-back-fist" },
            { name: "Filmes", icon: "film" },
            { name: "Animação", icon: "tv" },
            { name: "Pop", icon: "microphone-lines" },
            { name: "J-pop", icon: "compact-disc" },
            { name: "Antigas", icon: "guitar" },
            { name: "Lo-Fi", icon: "chart-simple" },
            { name: "Rap", icon: "music" },
            { name: "Veja Todos", icon: "plus" },
          ].map((genre, i) => (
            <TouchableOpacity key={i} style={styles.boxGenre}>
              <Text style={styles.genreText}>
                {genre.name} <Icon name={genre.icon} size={16} />
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf5f8",
  },
  main: {
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  text: {
    marginVertical: 15,
    width: "90%",
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#be7ccc",
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
  price: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
    color: "#000",
  },
  generos: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  boxGenre: {
    width: "30%",
    backgroundColor: "#a18de3",
    borderRadius: 8,
    marginVertical: 5,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  genreText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
});
