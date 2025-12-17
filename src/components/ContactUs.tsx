import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "./Header";
import FooterDetails from "./FooterDetails";

// VALIDATION SCHEMA
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit phone number")
    .required("Phone number is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string(),
});

const ContactUs: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>

      {/* FULL-WIDTH HEADER */}
      <Header />

      {/* EVERYTHING SCROLLS INCLUDING FOOTER */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

        <View style={styles.contentWrapper}>

          {/* CONTACT INFO */}
          <Text style={styles.heading}>CONTACT INFO</Text>
          <Text style={styles.subText}>
            For any concerns or enquiries regarding your order, reach out to us at{" "}
            <Text style={styles.emailSpan}>@test.com</Text>
          </Text>

          <Text style={styles.sectionTitle}>Customer Service</Text>

          <View style={styles.row}>
            <Feather name="phone-call" size={18} color="#6A0016" />
            <Text style={styles.infoText}>+91 6361735696</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="email" size={18} color="#6A0016" />
            <Text style={styles.infoText}>test@gmail.com</Text>
          </View>

          <View style={styles.row}>
            <Feather name="map-pin" size={18} color="#6A0016" />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <Text style={styles.addressLabel}>Address:</Text>
              <Text style={styles.addressText}>
                test area ,{"\n"}
                Bangalore, Karnataka-560082
              </Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Our Timings</Text>
          <Text style={styles.infoText}>
            Timings: Monday – Saturday | 10:00 AM – 6:30 PM
          </Text>

          {/* FORM TITLE */}
          <Text style={[styles.heading, { marginTop: 30 }]}>GET IN TOUCH</Text>

          {/* FORM START */}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={(values) => {
              console.log("Form Data:", values);
              Alert.alert("Form submitted successfully!");
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.form}>

                  {/* First Name */}
                  <TextInput
                    placeholder="Your first name"
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    style={styles.input}
                  />
                  {touched.firstName && errors.firstName && (
                    <Text style={styles.error}>{errors.firstName}</Text>
                  )}

                  {/* Last Name */}
                  <TextInput
                    placeholder="Your last name"
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    style={styles.input}
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={styles.error}>{errors.lastName}</Text>
                  )}

                  {/* Email */}
                  <TextInput
                    placeholder="Your email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    style={styles.input}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  {/* Phone */}
                  <TextInput
                    placeholder="Your phone number"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={styles.error}>{errors.phone}</Text>
                  )}

                  {/* Subject */}
                  <TextInput
                    placeholder="Your subject"
                    value={values.subject}
                    onChangeText={handleChange("subject")}
                    style={styles.input}
                  />
                  {touched.subject && errors.subject && (
                    <Text style={styles.error}>{errors.subject}</Text>
                  )}

                  {/* Message */}
                  <TextInput
                    placeholder="Your message (optional)"
                    value={values.message}
                    onChangeText={handleChange("message")}
                    multiline
                    style={[styles.input, styles.messageBox]}
                  />
                </View>

                {/* SUBMIT BUTTON */}
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>

        </View>

        {/* FOOTER NOW SCROLLS */}
        <FooterDetails />
         

      </ScrollView>

    </View>
  );
};

export default ContactUs;

// ===================== STYLES =====================

const styles = StyleSheet.create({
  contentWrapper: {
    padding: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6A0016",
    marginBottom: 10,
  },

  subText: {
    color: "#333",
    marginBottom: 15,
    lineHeight: 20,
  },

  emailSpan: {
    color: "#6A0016",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6A0016",
    marginTop: 15,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },

  infoText: {
    fontSize: 15,
    marginLeft: 8,
    color: "#222",
  },

  addressLabel: {
    color: "#6A0016",
    fontWeight: "700",
  },

  addressText: {
    color: "#222",
    lineHeight: 20,
  },

  form: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 15,
  },

  messageBox: {
    height: 120,
    textAlignVertical: "top",
  },

  submitBtn: {
    backgroundColor: "#6A0016",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 6,
    marginLeft: 4,
  },
  footerCopy: {
    backgroundColor: "#6A0E0E", // maroon color
    height:100,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  footerCopyText: {
    color: "#F7DFBC", // light beige text
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
