import React, { useEffect, useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* -------- CONTEXTS -------- */
import { MenuProvider, MenuContext } from "./context/MenuContext";
import { ShopProvider } from "./context/ShopContext";

/* -------- SCREENS -------- */
import Home from "./screens/Home";
import Login from "./screens/LoginScreen";
import Signup from "./screens/Signup";
import AboutUs from "./screens/AboutUs";
import ContactUs from "./components/ContactUs";
import CategoryProductsScreen from "./screens/CategoryProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import CartScreen from "./screens/CartScreen";
import WishlistScreen from "./screens/WishlistScreen";

/* -------- COMPONENTS -------- */
import SideMenu from "./components/SideMenu";

/* -------- NAV TYPES -------- */
export type RootStackParams = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  AboutUs: undefined;
  ContactUs: undefined;

  CategoryProductsScreen: {
    category: string;
  };

  ProductDetailsScreen: {
    id:number,
    name: string;
    price: number;
    images: string[];
    outOfStock: boolean;
  };

  CartScreen: undefined;
  WishlistScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

/* ========================================================= */

export default function App() {
  return (
    <MenuProvider>
      <ShopProvider>
        <MainApp />
      </ShopProvider>
    </MenuProvider>
  );
}

/* ========================================================= */

function MainApp() {
  const { menuOpen, closeMenu } = useContext(MenuContext);
  const [isLoading, setIsLoading] = useState(true);

  const whatsappNumber = "916361950489";

  const openWhatsApp = () => {
    Linking.openURL(
      `https://wa.me/${whatsappNumber}?text=Hi%20I%20need%20assistance`
    );
  };

  useEffect(() => {
    const init = async () => {
      // simulate splash / async init if needed
      await new Promise((res) => setTimeout(res, 300));
      setIsLoading(false);
    };
    init();
  }, []);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {/* -------- STACK NAVIGATOR -------- */}
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen
            name="CategoryProductsScreen"
            component={CategoryProductsScreen}
          />
          <Stack.Screen
            name="ProductDetailsScreen"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
        </Stack.Navigator>

        {/* -------- FLOATING WHATSAPP -------- */}
        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={openWhatsApp}
          activeOpacity={0.8}
        >
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/021/495/946/non_2x/whatsapp-logo-icon-free-png.png",
            }}
            style={{ width: 60, height: 60 }}
          />
        </TouchableOpacity>

        {/* -------- SIDE MENU -------- */}
        <SideMenu visible={menuOpen} onClose={closeMenu} />
      </View>
    </NavigationContainer>
  );
}

/* ========================================================= */

const styles = StyleSheet.create({
  whatsappButton: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
