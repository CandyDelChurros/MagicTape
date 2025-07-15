import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail({ route }) {
  const { produto } = route.params;
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const addToCart = async () => {
    const item = {
      id: produto.id,
      title: produto.title,
      price: produto.price,
      quantity: quantity,
      image: produto.image,
    };
    try {
      const existingCart = await AsyncStorage.getItem("cart");
      const cart = existingCart ? JSON.parse(existingCart) : [];
      const index = cart.findIndex(i => i.id === item.id);
      if (index >= 0) {
        cart[index].quantity += item.quantity;
      } else {
        cart.push(item);
      }
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {}
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <ImageBackground
          source={produto.image}
          style={styles.banner}
          resizeMode="cover"
        />

        <View style={styles.text}>
          <Text style={styles.textTitle}>{produto.title}</Text>
          <View style={styles.linehalf} />
          <Text style={styles.price}>{produto.price}</Text>
          <Text style={styles.promo}>{produto.installments}</Text>
        </View>

        <View style={styles.entrega}>
          <Text style={styles.entregaTitle}>Compromisso de Entrega</Text>
          <View style={styles.entregaRow}>
            <Icon name="truck-fast" size={20} style={styles.icon} />
            <Text style={styles.entregatext}>Frete Grátis acima de R$ 99,00</Text>
          </View>
          <View style={styles.linehalf} />
          <View style={styles.entregaRow}>
            <Icon name="box-open" size={20} style={styles.icon} />
            <Text style={styles.entregatext}>Entrega: 16 de agosto - 29 de agosto</Text>
          </View>
          <View style={styles.linehalf} />
          <View style={styles.entregaRow}>
            <Icon name="bolt" size={20} style={styles.icon} />
            <Text style={styles.entregatext}>Entrega Rápida</Text>
          </View>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.title}>Quantidade</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity style={styles.button} onPress={decrease}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.button} onPress={increase}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
            <Text style={styles.cartText}>Colocar no Carrinho</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdf5f8" },
  main: { alignItems: "center", paddingBottom: 30 },
  banner: { width: "100%", height: 400 },
  text: { width: "100%", backgroundColor: "#fff", paddingVertical: 10 },
  textTitle: { marginTop: 15, marginLeft: 15, fontWeight: "bold", fontSize: 20, color: "#be7ccc" },
  price: { fontSize: 35, fontWeight: "bold", marginLeft: 15 },
  promo: { fontSize: 15, color: "#FF0000", fontWeight: "bold", marginLeft: 15 },
  entrega: { backgroundColor: "#e6ffef", width: "100%", paddingVertical: 10 },
  entregaTitle: { color: "#00b041", fontWeight: "bold", fontSize: 18, marginLeft: 15, marginBottom: 15 },
  entregaRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  entregatext: { marginLeft: 15, fontSize: 15, fontStyle: "italic" },
  icon: { marginLeft: 15 },
  linehalf: { height: 1, backgroundColor: "#ccc", width: "90%", alignSelf: "flex-end", marginVertical: 8 },
  wrapper: { marginTop: 10, width: "90%" },
  title: { fontSize: 18, fontWeight: "bold" },
  counterContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  button: { borderRadius: 50, width: 35, height: 35, alignItems: "center", justifyContent: "center", backgroundColor: "#e3d4f3", marginRight: 15 },
  buttonText: { fontSize: 20, fontWeight: "bold" },
  quantity: { fontSize: 18, fontWeight: "bold", marginRight: 20 },
  cartButton: { marginTop: 15, backgroundColor: "#be7ccc", alignItems: "center", justifyContent: "center", borderRadius: 8, paddingVertical: 12 },
  cartText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});