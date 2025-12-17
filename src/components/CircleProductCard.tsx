import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../App"; 
type NavProp = NativeStackNavigationProp<RootStackParams, "CategoryProductsScreen">;
interface CircleProductCardProps {
  name: string;
  image: string;
}

export default function CircleProductCard({ name, image }: CircleProductCardProps) {

  const navigation = useNavigation<NavProp>();

  
  const handlePress = () => {
    navigation.navigate("CategoryProductsScreen", { category: name });
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#2e2e2e",
    textAlign: "center",
    textTransform: "capitalize",
  },
});
