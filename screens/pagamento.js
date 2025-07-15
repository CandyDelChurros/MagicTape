import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MagicTape() {
  const [usuario, setUsuario] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const userData = await AsyncStorage.getItem("usuario");
        if (userData) setUsuario(JSON.parse(userData));

        const cartData = await AsyncStorage.getItem("cart");
        const items = cartData ? JSON.parse(cartData) : [];
        setCartItems(items);

        const total = items.reduce((sum, item) => {
          const price = parseFloat(item.price.replace(/[^\d,]/g, "").replace(",", "."));
          return sum + price * item.quantity;
        }, 0);
        setSubtotal(total);
      } catch (e) {
        console.log("Erro ao carregar dados:", e);
      }
    };

    carregarDados();
  }, []);

  const confirmarCompra = async () => {
    Alert.alert("Compra realizada!", "Obrigado por comprar conosco!");
    await AsyncStorage.removeItem("cart");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.adress}>
          <Text style={styles.adresstitle}> Endereço de Entrega </Text>
          <Text style={styles.adresstext}>
            {usuario
              ? `${usuario.nome} ${usuario.telefone}`
              : "Nome do usuário + telefone"}
          </Text>
          <Text style={styles.adresstext}>
            Vila Abacate, Bairro Limoeiro, 1790
          </Text>
          <Text style={styles.adresstext}>
            Três Lagoas, Mato Grosso do Sul, Brasil, 79630-000
          </Text>
          <View style={styles.line} />
        </View>

        <View style={styles.detail}>
          <Text style={styles.detailtitle}>Opções de Entrega</Text>
          <Text style={styles.detailtext}>Envio: Frete Grátis</Text>
          <Text style={styles.detailtext}>
            Entrega 17 de Agosto - 22 de Agosto
          </Text>

          <View style={styles.linehalf} />

          <Text style={styles.detailtitle}>Detalhes do(s) Item(s)</Text>
          {cartItems.map((item, i) => (
            <View key={i} style={{ flexDirection: "row", marginBottom: 10 }}>
              <ImageBackground
                source={item.image}
                style={styles.banner}
                resizeMode="cover"
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.adresstext}>{item.title}</Text>
                <Text style={styles.bannertext}>
                  R$ {parseFloat(item.price.replace(/[^\d,]/g, "").replace(",", ".")).toFixed(2)}
                </Text>
                <Text style={styles.adresstext}>Qtd: {item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.pay}>
          <Text style={styles.paytitle}>Método de Pagamento</Text>
          <Text style={styles.paytext}>
            <Icon name="credit-card" size={24} color="#000" style={styles.icon} /> 5555 09****** 5555
          </Text>
        </View>

        <View style={styles.review}>
          <Text style={styles.reviewtitle}>Resumo</Text>

          <View style={styles.reviewsub}>
            <Text style={styles.reviewtext}>Subtotal</Text>
            <Text style={styles.reviewtext}>R$ {subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.linehalf} />

          <View style={styles.reviewend}>
            <Text style={styles.reviewtext}>Frete</Text>
            <Text style={styles.reviewtext}>Grátis</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={confirmarCompra}>
          <Text style={styles.cartText}>Confirmar Compra</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
