import React from "react";
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

export default function WishlistScreen() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <View style={styles.container}>
        <View style={styles.titlediv}>
        <Text style={styles.title}> Wishlist</Text>
        </View>
        {wishlist.length === 0 ? (
          <Text style={styles.empty}>No items added yet.</Text>
        ) : (
          <FlatList
            data={wishlist}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 160 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.details}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                  </Text>

                  <Text style={styles.price}>
                    {formatPrice(item.price)}
                  </Text>

                  <View style={styles.buttonRow}>
                    {/* ADD TO CART */}
                    <TouchableOpacity
                      onPress={() => addToCart(item)}
                      style={styles.cartBtn}
                    >
                      <Text style={styles.btnText}>
                        Add to Cart 
                      </Text>
                    </TouchableOpacity>

                    {/* REMOVE */}
                    <TouchableOpacity
                      onPress={() => removeFromWishlist(item.id)}
                      style={styles.removeBtn}
                    >
                      <Text style={styles.btnText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>

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
    color: "#6A0E0E",
    marginBottom: 15,
  },

  empty: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 60,
    color: "#777",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  price: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  cartBtn: {
    backgroundColor: "#2E7D32",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },

  removeBtn: {
    backgroundColor: "#b71c1c",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },

  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  titlediv:{
    width:'100%',
    alignItems:'center',
    justifyContent:'center'

  }
});
