import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import FooterDetails from "../components/FooterDetails";
import ProductCard from "../components/ProductCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryProductsScreen() {
  const route = useRoute();
  const { category } = route.params as { category: string };

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://192.168.0.102:5000/api";
  // 👉 Fetch products based on category
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/fetchbasedoncat?category=${encodeURIComponent(category)}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.content}>
          <Text style={styles.headerText}>
            Showing {loading ? "..." : products.length} results for "{category}"
          </Text>

          {loading ? (
            <ActivityIndicator size="large" style={{ marginTop: 30 }} />
          ) : (
            <View style={styles.grid}>
              {products.map((item) => (
                <ProductCard
                    key={item.id}
                    id={(item.id)}        // 🔥 ADD THIS
                    name={item.name}
                    price={Number(item.price)}
                    image={item.image}
                    outOfStock={item.outOfStock}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.footerContainer}>
          <FooterDetails />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  footerContainer: {
    width: "100%",
    backgroundColor: "#fff",
  },
});
