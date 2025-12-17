import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";

type Props = NativeStackScreenProps<RootStackParams, "Signup">;
const BASE_URL = "http://192.168.0.101:5000/api";

const Signup: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [serverOtp, setServerOtp] = useState(""); // Store OTP from backend
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // STEP 1: SEND OTP
  const handleSendOtp = async () => {
    if (!name.trim()) return Alert.alert("Error", "Enter your name");
    if (!email.trim()) return Alert.alert("Error", "Enter email");

    try {
      const response = await fetch(`${BASE_URL}/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setServerOtp(String(data.otp)); // <-- Save OTP for comparison
        Alert.alert("OTP Sent", "Check your email");
      } else {
        Alert.alert("Failed", data.message || "Try again");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Server not responding");
    }
  };

  // STEP 2: VALIDATE OTP + REGISTER
  const handleRegister = async () => {
    if (!otp.trim()) return Alert.alert("Error", "Enter OTP");

    // Validate OTP
    if (otp !== serverOtp) {
      return Alert.alert("Error", "Invalid OTP");
    }

    if (!password.trim()) return Alert.alert("Error", "Enter password");

    if (password !== confirmPass)
      return Alert.alert("Error", "Passwords do not match");

    try {
      const response = await fetch(`${BASE_URL}/user/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Success", "Account created successfully!");
        navigation.replace("Login");
      } else {
        Alert.alert("Failed", data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Server error");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <Feather name="x" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>REGISTER</Text>

      {/* Name */}
      {!otpSent && (
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#999"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      )}

      {/* Email */}
      <TextInput
        placeholder="Email address"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* Send OTP Button */}
      {!otpSent && (
        <TouchableOpacity style={styles.sendOtpBtn} onPress={handleSendOtp}>
          <Text style={styles.registerText}>Send OTP</Text>
        </TouchableOpacity>
      )}

      {/* After OTP Sent */}
      {otpSent && (
        <>
          <TextInput
            placeholder="Enter OTP"
            style={styles.input}
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
            value={confirmPass}
            onChangeText={setConfirmPass}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.registerText}>Create Account</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.bottomText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={() => navigation.navigate("Home")}>
          Login
        </Text>
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 30 },
  closeBtn: { position: "absolute", right: 20, top: 20 },
  title: { fontSize: 26, fontWeight: "600", marginBottom: 30, marginTop: 60 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    fontSize: 16,
  },
  sendOtpBtn: {
    backgroundColor: "#6B3F21",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 25,
  },
  registerBtn: {
    backgroundColor: "#6B3F21",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 15,
  },
  registerText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  bottomText: { textAlign: "center", fontSize: 15, marginTop: 20 },
  loginLink: { textDecorationLine: "underline", fontWeight: "600" },
});
