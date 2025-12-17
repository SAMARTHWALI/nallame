import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Header from "../components/Header";
import FooterDetails from "../components/FooterDetails";
import { useShop } from "../context/ShopContext";

/* -------- Currency Formatter -------- */
const formatPrice = (value: number) =>
  value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

export default function CartScreen() {
  const { cart, removeFromCart } = useShop();

  /* -------- Total Calculation -------- */
  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <View style={styles.container}>
        <View style={styles.titlediv}>
        <Text style={styles.title}>My Cart</Text>
        </View>
        {cart.length === 0 ? (
          <Text style={styles.empty}>Your cart is empty.</Text>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 160 }}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.infoContainer}>
                  <Text numberOfLines={1} style={styles.name}>
                    {item.name}
                  </Text>

                  <Text style={styles.price}>
                    {formatPrice(item.price)}
                  </Text>

                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    style={styles.removeBtn}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* CHECKOUT BAR */}
      {cart.length > 0 && (
        <View style={styles.checkoutSection}>
          <Text style={styles.total}>
            Total: {formatPrice(totalAmount)}
          </Text>

          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* FOOTER */}
      <FooterDetails />
    </View>
  );
}

/* -------- Styles -------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    padding: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#6A0E0E",
  },

  empty: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 80,
    color: "#777",
  },

  itemCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
  },

  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 6,
  },

  removeBtn: {
    backgroundColor: "#6A0E0E",
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
    borderRadius: 6,
    marginTop: 10,
  },

  removeText: {
    color: "#fff",
    fontSize: 14,
  },

  checkoutSection: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  checkoutBtn: {
    backgroundColor: "#6A0E0E",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  titlediv:{
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  }
});
