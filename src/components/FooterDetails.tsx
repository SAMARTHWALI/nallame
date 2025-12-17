import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";

export default function FooterDetails() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <>
      <View style={styles.container}>

        {/* LEFT SECTION */}
        <View style={styles.left}>
          <View style={styles.block}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.link}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
              <Text style={styles.link}>About Us</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
              <Text style={styles.link}>Contact Us</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.block}>
            <Text style={styles.heading}>POLICIES</Text>
            <Text style={styles.link}>Terms Of Service</Text>
            <Text style={styles.link}>Refund & Return Policy</Text>
            <Text style={styles.link}>Privacy Policy</Text>
            <Text style={styles.link}>Shipping Policy</Text>
          </View>

          <View style={styles.block}>
            <Text style={styles.heading}>SHOP</Text>
            <Text style={styles.link}>My Account</Text>
            <Text style={styles.link}>Track Your Order</Text>
            <Text style={styles.link}>Sarees</Text>
            <Text style={styles.link}>Accessories</Text>
          </View>
        </View>

        {/* RIGHT SECTION */}
        <View style={styles.right}>
          <Text style={styles.heading}>FOLLOW US</Text>

          <View style={styles.socialRow}>
            {[
              "https://i.pinimg.com/736x/8f/94/c6/8f94c616ec0a60bafb4de4e0260719da.jpg",
              "https://i.pinimg.com/736x/ac/57/3b/ac573b439cde3dec8ca1c6739ae7f628.jpg",
              "https://images.ctfassets.net/h67z7i6sbjau/5zteWRcC1qbgLZoClcMmYl/a0391fdc321eddce7de41152108723b5/Brand_Guidelines_hero_2x.jpg?fm=webp&q=85",
              "https://png.pngtree.com/element_our/sm/20180626/sm_5b321c99945a2.jpg",
            ].map((url, index) => (
              <TouchableOpacity key={index} style={styles.iconBox}>
                <Image source={{ uri: url }} style={styles.iconImg} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* COPYRIGHT SECTION - FULL WIDTH */}
      <View style={styles.footerCopy}>
        <Text style={styles.footerCopyText}>
          © 2025 All rights reserved. Developed {"\n"}by Samarth Wali.
        </Text>
      </View>
    </>
  );
}

// ----------- STYLES -----------

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F7DFBC",
    padding: 20,
  },

  left: {
    flex: 1,
  },

  block: {
    marginBottom: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#6A0E0E",
    marginBottom: 8,
  },

  link: {
    fontSize: 16,
    color: "#000",
    marginVertical: 3,
  },

  right: {
    marginTop: 10,
  },

  socialRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  iconBox: {
    width: 45,
    height: 45,
    backgroundColor: "#6A0E0E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginRight: 10,
  },

  iconImg: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },

  footerCopy: {
    width: "100%",
    backgroundColor: "#6A0E0E",
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  footerCopyText: {
    color: "#F7DFBC",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
});
