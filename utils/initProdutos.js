import AsyncStorage from "@react-native-async-storage/async-storage";

const produtos = [
  {
    id: "1",
    title: "Bocchi The Rock! - Song Album",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/Bocchi.png"),
  },
  {
    id: "2",
    title: "Guardião das Galaxia V.2",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/Guardiao.png"),
  },
  {
    id: "3",
    title: "Nana - Collection Album",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/Nana.png"),
  },
  {
    id: "4",
    title: "Oshi no Ko V.1 - Song Album",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/Oshi.png"),
  },
  {
    id: "5",
    title: "Bohemian Rhapsody - QUEEN",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/Queen.png"),
  },
  {
    id: "6",
    title: "Sour - Olivia Rodrigo",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/Olivia.png"),
  },
  {
    id: "7",
    title: "Sailorwave - Collection Album",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/SailorWave.png"),
  },
  {
    id: "8",
    title: "The Tortured Poets - Taylor Swift",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/Taylor.png"),
  },
  {
    id: "9",
    title: "A Million Miles Away - Vaporware",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/Vaporware.png"),
  },
  {
    id: "10",
    title: "The Book 3 - Yoasobi",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/Yoasobi.png"),
  },
  {
    id: "11",
    title: "Graduaction - Kayne West",
    installments: "3x de R$ 11,00",
    price: "ou R$ 30,00 à vista",
    image: require("./../assets/Kayne.png"),
  },
];

export const salvarProdutos = async () => {
  try {
    await AsyncStorage.setItem("produtos", JSON.stringify(produtos));
    console.log("Produtos salvos com sucesso");
  } catch (error) {
    console.log("Erro ao salvar produtos:", error);
  }
};
