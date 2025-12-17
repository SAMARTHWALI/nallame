import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function FeatureGrid() {
  const features = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3500/3500833.png",
      label: "Free Shipping over\n1499",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
      label: "Assured Quality",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2721/2721055.png",
      label: "Secure Payment",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1621/1621797.png",
      label: "100% Purchase\nProtection",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/929/929416.png",
      label: "Best Price Promise",
    },
  ];

  return (
    <View style={styles.container}>
      {features.map((item, index) => (
        <View key={index} style={styles.item}>
          <Image source={{ uri: item.icon }} style={styles.icon} />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5A0A1D",
    paddingVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },

  item: {
    width: "40%",
    alignItems: "center",
    marginVertical: 20,
  },

  icon: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    marginBottom: 8,
  },

  label: {
    textAlign: "center",
    color: "#FFE5C4",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "600",
  },
});
