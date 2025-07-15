import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function HeaderCustom() {
  const navigation = useNavigation();

  return (
    <View style={styles.rodapeMain}>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <ImageBackground
          source={require('../assets/Logo.png')}
          style={styles.logoIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.rodapeRight}>
        <Icon name="user" size={24} color="#000" style={styles.icon} />
        <Icon name="cart-shopping" size={24} color="#000" style={styles.icon} onPress={() => navigation.navigate('Carrinho')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rodapeMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginVertical: 15,
    marginLeft: 20,
    marginTop: 40,
  },
  logoIcon: {
    width: 50,
    height: 50,
  },
  rodapeRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 100,
    gap: 10,
  },
  icon: {
    marginLeft: 15,
  }
});