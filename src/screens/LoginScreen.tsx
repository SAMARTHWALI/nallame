import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Feather from "react-native-vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";
type Props = NativeStackScreenProps<RootStackParams, "Login">;
// interface LoginResponse {
//   success: boolean;
//   message: string;
//   token?: string;
// }

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const BASE_URL = "http://192.168.0.103:5000/api";

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        Alert.alert("Success", "Logged in successfully!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      {/* Close Icon */}
      <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => navigation.popToTop()}
            >
        <Feather name="x" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>LOGIN</Text>

      {/* Email */}
      <TextInput
        placeholder="Username or email address"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Remember Me */}
      <View style={styles.row}>
        <CheckBox value={remember} onValueChange={setRemember} />
        <Text style={styles.rememberText}>Remember me</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.linkText}>Lost your password?</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Not a member?{" "}
        <Text
            style={styles.linkUnderline}
            onPress={() => navigation.navigate("Signup")}
        >
            Register
        </Text>
        </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  closeBtn: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    marginBottom: 30,
    marginTop: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dddddd",
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: "#6B3F21",
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    textDecorationLine: "underline",
    marginBottom: 20,
    fontSize: 15,
  },
  linkUnderline: {
    textDecorationLine: "underline",
    fontSize: 15,
  },
  bottomText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
});
