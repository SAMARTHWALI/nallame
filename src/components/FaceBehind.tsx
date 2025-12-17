import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function FaceBehind() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>THE FACE BEHIND{"\n"}NAMMA STORE</Text>

      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: "https://i.pinimg.com/1200x/d0/90/c6/d090c63ca3f197f661df7d632e290db8.jpg",
          }}
          style={styles.image}
        />
      </View>

      <Text style={styles.name}>Rakshit{"\n"}Shetti</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6E0C4", // cream background
    paddingVertical: 50,
    alignItems: "center",
    marginBottom:5
  },

  title: {
    fontSize: 26,
    color: "#630C20", // deep maroon
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 1.5,
    lineHeight: 32,
    marginBottom: 35,
  },

  imageWrapper: {
    width: 200,
    height: 240,
    overflow: "hidden",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 25,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  name: {
    fontSize: 18,
    color: "#630C20",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 1,
    lineHeight: 22,
  },
});
