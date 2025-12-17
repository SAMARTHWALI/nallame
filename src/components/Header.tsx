import React, { useContext, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";

import { MenuContext } from "../context/MenuContext";
import { useShop } from "../context/ShopContext";

type NavProp = NativeStackNavigationProp<RootStackParams>;

const Header: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  /* -------- CONTEXTS -------- */
  const { openMenu } = useContext(MenuContext);
  const shop = useShop(); // defensive usage

  const cartCount = shop?.cart?.length ?? 0;
  const wishlistCount = shop?.wishlist?.length ?? 0;

  const renderBadge = (count: number) => {
    if (count <= 0) return null;

    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {count > 99 ? "99+" : count}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        {/* -------- LEFT: MENU + LOGO -------- */}
        <View style={styles.leftRow}>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={openMenu}
            activeOpacity={0.7}
          >
            <Icon name="menu" size={26} color="#F5DDB6" />
          </TouchableOpacity>

          <View style={styles.logoBox}>
            <Text style={styles.logoText}>namma</Text>
            <Text style={styles.logoSmall}>store</Text>
          </View>
        </View>

        {/* -------- RIGHT ICONS -------- */}
        <View style={styles.rightRow}>
          {/* SEARCH */}
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Icon name="search" size={22} color="#5A0A1D" />
          </TouchableOpacity>

          {/* WISHLIST */}
          <TouchableOpacity
            style={styles.iconBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("WishlistScreen")}
          >
            <Icon name="heart" size={22} color="#5A0A1D" />
            {renderBadge(wishlistCount)}
          </TouchableOpacity>

          {/* USER */}
          <TouchableOpacity
            style={styles.iconBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Login")}
          >
            <Icon name="user" size={22} color="#5A0A1D" />
          </TouchableOpacity>

          {/* CART */}
          <TouchableOpacity
            style={styles.iconBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("CartScreen")}
          >
            <MaterialIcon name="cart-outline" size={24} color="#5A0A1D" />
            {renderBadge(cartCount)}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(Header);

/* -------- Styles -------- */

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#5A0A1D",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#5A0A1D",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuBtn: {
    padding: 6,
  },

  logoBox: {
    marginLeft: 10,
  },

  logoText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#F5DDB6",
    letterSpacing: 1,
  },

  logoSmall: {
    color: "#F5DDB6",
    fontSize: 10,
    marginTop: -6,
    marginLeft: 2,
  },

  rightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconBtn: {
    backgroundColor: "#F5DDB6",
    padding: 10,
    borderRadius: 14,
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#5A0A1D",
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#F5DDB6",
    fontSize: 11,
    fontWeight: "700",
  },
});
