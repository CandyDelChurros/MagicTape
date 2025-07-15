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

export default function Carrinho() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await AsyncStorage.getItem("cart");
      const items = data ? JSON.parse(data) : [];
      setCartItems(items);

      const total = items.reduce((sum, item) => {
        const priceNumber = parseFloat(item.price.replace(/[^\d,]/g, '').replace(",", "."));
        return sum + priceNumber * item.quantity;
      }, 0);
      setSubtotal(total);
    };

    fetchCart();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Seu Carrinho</Text>

        {cartItems.length === 0 ? (
          <Text style={{ marginTop: 20 }}>Carrinho vazio.</Text>
        ) : (
          cartItems.map((item, i) => (
            <View key={i} style={styles.item}>
              <ImageBackground source={item.image} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.price}>R$ {parseFloat(item.price.replace(/[^\d,]/g, '').replace(",", ".")).toFixed(2)}</Text>
                <Text style={styles.qty}>Quantidade: {item.quantity}</Text>
              </View>
            </View>
          ))
        )}

        <View style={styles.line} />

        <View style={styles.summary}>
          <Text style={styles.summaryText}>Subtotal:</Text>
          <Text style={styles.summaryText}>R$ {subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>Frete:</Text>
          <Text style={styles.summaryText}>Grátis</Text>
        </View>

        <View style={styles.summaryTotal}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>R$ {subtotal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
