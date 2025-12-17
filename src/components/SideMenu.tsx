import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get("window");

type sProp = NativeStackNavigationProp<RootStackParams>;

const SideMenu: React.FC<Props> = ({ visible, onClose }) => {
  const navigation = useNavigation<sProp>();
  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleNavigation = (screen: keyof RootStackParams) => {
    onClose();
    navigation.navigate(screen);
  };

  if (!visible) return null;

  return (
    <>
      {/* Background overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Sliding Menu */}
      <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>

        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("Home")}>
            <Text style={styles.menuText}>HOME</Text>
          </TouchableOpacity>

          <View style={styles.shopRow}>
            <Text style={styles.menuText}>SHOP</Text>
            <TouchableOpacity style={styles.plusBtn}>
              <AntDesign name="plus" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("ContactUs")}>
            <Text style={styles.menuText}>CONTACT US</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>TRACK YOUR ORDER</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("AboutUs")}>
            <Text style={styles.menuText}>ABOUT US</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  container: {
    position: "absolute",
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: "#610026",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  closeBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#4E0120",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
  menuList: {
    marginTop: 30,
  },
  menuItem: {
    marginBottom: 25,
  },
  menuText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  shopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  plusBtn: {
    borderWidth: 1,
    borderColor: "white",
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
});
