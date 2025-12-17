import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

import Header from "../components/Header";
import FaceBehind from "../components/FaceBehind";
import FooterDetails from "../components/FooterDetails";

const AboutUs: React.FC = () => {
  return (
    <View style={styles.root}>
      <Header />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* CONTENT */}
        <View style={styles.contentWrapper}>
          {/* Logo */}
          <View style={styles.logoWrapper}>
            <View style={styles.logoCircle}>
              <Feather name="shopping-bag" size={48} color="#F5DDB6" />
            </View>
          </View>

          <Text style={styles.paragraph}>
            Namma store began with something beautifully simple — two friends
            who shared one common love: shopping...
          </Text>

          <Text style={styles.paragraph}>
            That single thought became the spark that lit the journey of Namma
            Store...
          </Text>

          <Text style={styles.paragraph}>
            Every item we bring to you is handpicked with intention...
          </Text>

          <Text style={styles.paragraph}>
            At Namma store, we want you to feel confident, beautiful, and
            connected...
          </Text>
        </View>

        {/* FULL WIDTH SECTIONS */}
        <FaceBehind />
        <FooterDetails />
      </ScrollView>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 20, // small breathing space only
  },

  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },

  logoCircle: {
    width: 140,
    height: 140,
    backgroundColor: "#6A0016",
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#222",
    marginBottom: 16,
  },
});

