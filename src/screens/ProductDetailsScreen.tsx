// src/screens/ProductDetailsScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import { Heart, ShoppingBag } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "../components/Header";
import { RootStackParams } from "../App";
import { useShop } from "../context/ShopContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavProp = NativeStackNavigationProp<RootStackParams>;


const { width } = Dimensions.get("window");

type Props = NativeStackScreenProps<
  RootStackParams,
  "ProductDetailsScreen"
>;

const ProductDetailsScreen: React.FC<Props> = ({ route }) => {
  const { id, name, price, images, outOfStock } = route.params;
  const navigation = useNavigation<NavProp>();

  const { addToCart, addToWishlist, cart, wishlist } = useShop();

  const isInWishlist = wishlist.some((p) => p.id === id);
  const isInCart = cart.some((p) => p.id === id);

  /* -------- HANDLERS -------- */

  const handleWishlist = () => {
    if (isInWishlist) {
      Alert.alert("Already in Wishlist ❤️");
      return;
    }
    addToWishlist({ id, name, price, image: images[0] });
    Alert.alert("Added to Wishlist ❤️");
  };

  const handleAddToCart = () => {
    if (outOfStock) return;

    if (isInCart) {
      Alert.alert("Already in Cart 🛍️");
      return;
    }
    addToCart({ id, name, price, image: images[0] });
    Alert.alert("Added to Cart 🛍️");
  };

  const handleBuyNow = () => {
  if (outOfStock) return;

  // Add to cart if not already there
  if (!isInCart) {
    addToCart({ id, name, price, image: images[0] });
  }

  // Navigate to cart
  navigation.navigate("CartScreen");
};

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* IMAGE CAROUSEL */}
        <View style={styles.carouselWrapper}>
          <Swiper autoplay autoplayTimeout={3} loop>
            {images.map((imgUrl, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: imgUrl }} style={styles.image} />
              </View>
            ))}
          </Swiper>

          {/* FLOATING WISHLIST */}
          <TouchableOpacity
            style={styles.floatingHeart}
            onPress={handleWishlist}
            activeOpacity={0.8}
          >
            <Heart
              size={22}
              color={isInWishlist ? "#c30047" : "#ffffff"}
              fill={isInWishlist ? "#c30047" : "transparent"}
            />
          </TouchableOpacity>
        </View>

        {/* PRODUCT INFO */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{price}</Text>

            <View
              style={[
                styles.badge,
                { backgroundColor: outOfStock ? "#c62828" : "#2e7d32" },
              ]}
            >
              <Text style={styles.badgeText}>
                {outOfStock ? "OUT OF STOCK" : "IN STOCK"}
              </Text>
            </View>
          </View>

          {/* ICON ROW */}
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleWishlist}
            >
              <Heart
                size={20}
                color={isInWishlist ? "#c30047" : "#444"}
                fill={isInWishlist ? "#c30047" : "transparent"}
              />
              <Text style={styles.iconLabel}>
                {isInWishlist ? "Wishlisted" : "Wishlist"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleAddToCart}
              disabled={outOfStock}
            >
              <ShoppingBag
                size={20}
                color={isInCart ? "green" : "#444"}
              />
              <Text style={styles.iconLabel}>
                {isInCart ? "In Cart" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Text style={styles.sectionText}>
              Premium product from Nallame. Add detailed description here.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            styles.addToCartButton,
            outOfStock && { opacity: 0.6 },
          ]}
          onPress={handleAddToCart}
          disabled={outOfStock}
        >
          <Text style={styles.bottomButtonText}>
            {outOfStock
              ? "OUT OF STOCK"
              : isInCart
              ? "IN CART"
              : "ADD TO CART"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomButton,
            styles.buyNowButton,
            outOfStock && { opacity: 0.6 },
          ]}
          onPress={handleBuyNow}
          disabled={outOfStock}
        >
          <Text style={styles.bottomButtonText}>BUY NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  carouselWrapper: {
    width: "100%",
    height: width * 1.1,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  dot: {
    backgroundColor: "rgba(0,0,0,0.2)",
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    marginBottom: 10,
  },
  activeDot: {
    backgroundColor: "#c30047",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    marginBottom: 10,
  },
  floatingHeart: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-around",
  },
  iconButton: {
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#444",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#222",
  },
  sectionText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButton: {
    backgroundColor: "#ffcc00",
  },
  buyNowButton: {
    backgroundColor: "#ff5722",
  },
  bottomButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
