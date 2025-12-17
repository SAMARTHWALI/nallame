import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";

import Header from "../components/Header";
import CircleProductCard from "../components/CircleProductCard";
import FeatureGrid from "../components/FeatureGrid";
import FaceBehind from "../components/FaceBehind";
import FooterDetails from "../components/FooterDetails";
import ProductCard from "../components/ProductCard";

import { useApi } from "../useApi";

export default function Home() {

  const {
    loading,                 // ✅ added
    heroImages,
    sareeCategories,
    accessories,
    newArrivals,
    weddingCollection,
  } = useApi();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]).start();

      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages,fadeAnim]);

  // ✅ LOADING SCREEN
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6A0E0E" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 🔥 HERO SECTION */}
        <View style={styles.heroSection}>
          {heroImages.length > 0 && (
            <>
              <Animated.View style={[styles.heroImageContainer, { opacity: fadeAnim }]}>
                <Image
                  source={{ uri: heroImages[currentImageIndex].uri }}
                  style={styles.heroImage}
                />
              </Animated.View>

              <View style={styles.heroTextOverlay}>
                <Text style={styles.heroTitle}>
                  {heroImages[currentImageIndex].title}
                </Text>
                <Text style={styles.heroSubtitle}>
                  {heroImages[currentImageIndex].subtitle}
                </Text>
                <Text style={styles.heroTagline}>
                  {heroImages[currentImageIndex].tagline1}
                </Text>
                <Text style={styles.heroTagline}>
                  {heroImages[currentImageIndex].tagline2}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* 🔥 SAREE CATEGORIES */}
        <View style={styles.section}>
          <View style={styles.stylessectionTitlediv}>
            <Text style={styles.sectionTitle}>Saree Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sareeCategories.map(cat => (
              <CircleProductCard
                key={cat.id}
                name={cat.name}
                image={cat.image}
              />
            ))}
          </ScrollView>
        </View>

        {/* 🔥 ACCESSORIES */}
        <View style={styles.section}>
          <View style={styles.stylessectionTitlediv}>
            <Text style={styles.sectionTitle}>Accessories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {accessories.map(cat => (
              <CircleProductCard
                key={cat.id}
                name={cat.name}
                image={cat.image}
              />
            ))}
          </ScrollView>
        </View>

        {/* 🔥 NEW ARRIVALS */}
        <View style={styles.section}>
          <View style={styles.stylessectionTitlediv}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
          </View>
          <View style={styles.productGrid}>
            {newArrivals.map(item => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={Number(item.price)}
                image={item.image}
                outOfStock={item.outOfStock}
              />
            ))}
          </View>
        </View>

        {/* 🔥 WEDDING COLLECTION */}
        <View style={styles.section}>
          <View style={styles.stylessectionTitlediv}>
            <Text style={styles.sectionTitle}>Wedding Collection</Text>
          </View>
          <View style={styles.productGrid}>
            {weddingCollection.map(item => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={Number(item.price)}
                image={item.image}
                outOfStock={item.outOfStock}
              />
            ))}
          </View>
        </View>

        <FeatureGrid />
        <FaceBehind />
        <FooterDetails />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: { height: 500 },
  heroImageContainer: { height: "100%" },
  heroImage: { width: "100%", height: "100%" },
  heroTextOverlay: { position: "absolute", bottom: 40, left: 20 },
  heroTitle: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  heroSubtitle: { fontSize: 22, color: "#fff" },
  heroTagline: { fontSize: 16, color: "#fff" },
  section: { marginLeft: 10, marginRight: 10 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  stylessectionTitlediv: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
