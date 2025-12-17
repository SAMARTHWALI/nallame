import React, { memo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { Heart, ShoppingBag } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";
import { useShop } from "../context/ShopContext";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  outOfStock?: boolean;
};

type NavProp = NativeStackNavigationProp<RootStackParams>;

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  outOfStock = false,
}) => {
  const navigation = useNavigation<NavProp>();
  const { addToCart, addToWishlist, cart, wishlist } = useShop();

  const isInWishlist = wishlist.some((item) => item.id === id);
  const isInCart = cart.some((item) => item.id === id);

  const handleWishlist = () => {
    if (isInWishlist) {
      Alert.alert("Already in Wishlist");
      return;
    }
    addToWishlist({ id, name, price, image });
  };

  const handleAddToCart = () => {
    if (isInCart) {
      Alert.alert("Already in Cart");
      return;
    }
    addToCart({ id, name, price, image });
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("ProductDetailsScreen", {
          id,                 // ✅ PASS ID
          name,
          price,
          images: [image],
          outOfStock,
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />

        {outOfStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>OUT OF STOCK</Text>
          </View>
        )}
      </View>

      {/* ICONS */}
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={handleWishlist}>
          <Heart
            size={22}
            color={isInWishlist ? "#c30047" : "#444"}
            fill={isInWishlist ? "#c30047" : "transparent"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAddToCart} disabled={outOfStock}>
          <ShoppingBag
            size={22}
            color={isInCart ? "green" : "#444"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>₹{price}</Text>
    </Pressable>
  );
};

export default memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 25,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  outOfStockBadge: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 4,
  },
  outOfStockText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopWidth: 0,
  },
  name: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
  price: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
});
