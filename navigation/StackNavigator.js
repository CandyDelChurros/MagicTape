import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../screens/index.js';
import Choice from '../screens/choice.js';
import Detail from '../screens/detalhamento.js';
import Cart from '../screens/carrinho.js';
import Profile from '../screens/profile.js';
import Pay from '../screens/pagamento.js';
import Cadastro from '../screens/cadastro.js';
import Login from '../screens/login.js';
import Header from '../components/header';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: '#fdf5f8' },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Index"
        component={Index}
        options={{
          header: () => <Header />,
        }}
      />

      <Stack.Screen
        name="Choice"
        component={Choice}
        options={{
          header: () => <Header />,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          header: () => <Header />,
        }}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Meu Carrinho',
          headerStyle: { backgroundColor: '#fdf5f8' },
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Meu Perfil',
          headerStyle: { backgroundColor: '#fdf5f8' },
        }}
      />

      <Stack.Screen
        name="Pay"
        component={Pay}
        options={{
          title: 'Pagamento',
          headerStyle: { backgroundColor: '#fdf5f8' },
        }}
      />

      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          title: 'Cadastro',
          headerStyle: { backgroundColor: '#fdf5f8' },
        }}
      />
    </Stack.Navigator>
  );
}
