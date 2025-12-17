import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Heart, ShoppingBag } from "lucide-react-native";

interface NewArrivalCardProps {
  name: string;
  price?: string | number;
  image: string;
  outOfStock?: boolean;
  onPress?: () => void;
}

export default function Sarees({
  name,
  price,
  image,
  outOfStock,
  onPress,
}: NewArrivalCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>

      {/* IMAGE BOX */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />

        {/* OUT OF STOCK BADGE */}
        {outOfStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>OUT OF STOCK</Text>
          </View>
        )}

        {/* BRAND TAG */}
        <View style={styles.brandTag}>
          <Text style={styles.brandText}>nallame</Text>
        </View>
      </View>

      {/* ICONS ROW */}
      <View style={styles.iconRow}>
        <TouchableOpacity>
          <ShoppingBag size={22} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Heart size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* PRODUCT TITLE */}
      <Text style={styles.name}>{name}</Text>

      {/* PRICE */}
      {price && <Text style={styles.price}>₹{price}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 20,
  },

  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  outOfStockBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },

  outOfStockText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  brandTag: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#c30047",
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  brandText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 20,
  },

  name: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#333",
  },

  price: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
});
