import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";
import { salvarProdutos } from "./utils/initProdutos";
export default function App() {
  useEffect(() => {
    salvarProdutos();
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
