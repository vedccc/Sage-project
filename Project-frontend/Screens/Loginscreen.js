// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Welcomescreen from './Screens/Welcomescreen.js'

import { React, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { setUserIdRedux } from "../Redux-Toolkit/userId";
import { setNameRedux } from "../Redux-Toolkit/nameSlice";
import Spinner from "react-native-loading-spinner-overlay";
import { Formik } from "formik";
import * as yup from "yup";

import { useNavigation } from "@react-navigation/native";

import * as GlobalVariables from "../config/GlobalVariableContext";
import { useSelector, useDispatch } from "react-redux";
import Textfeild from "../Components/Textfeild";
import Darkb from "../Components/Darkbutton";
import Topbar from "../Components/Topbar";
import * as API from "../Api/Constants";

export default function App() {
  const [showLoading, setShowLoading] = useState(false);
  const Constants = GlobalVariables.useValues();
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");

  // console.log('check mobi',mobile);

  // console.log('check pin',pin);

  const LoginApi = async () => {
    try {
      const Response = await fetch(API.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: mobile,
          pin: pin,
        }),
      });

      const myress = await Response.json();
      const nameData = myress.data.name;
      const uid = myress.data._id;
      console.log("ckeck login data", myress);
      dispatch(setNameRedux(nameData));
      dispatch(setUserIdRedux(uid));

      if (myress.status === 1) {
        // Navigate to success screen
        navigation.navigate("AppDrawer");
      } else if (myress.status !== 1) {
        Alert.alert(myress.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mob =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const registerValidationSchema = yup.object().shape({
    mobile: yup
      .string()
      .matches(mob, "Phone number is not valid")
      .required("Please enter your Phone no."),
    pin: yup.string().required("Please enter your 4 digit pin"),
  });

  return (
    // <Welcomescreen/>

    // * container start * //
    <Formik
      validateOnChange={true}
      onSubmit={LoginApi}
      validationSchema={registerValidationSchema}
      initialValues={{
        mobile: "",
        pin: "",
      }}
      // onSubmit={handleSignupUser}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        onSubmit,
        errors,
        isValid,
      }) => (
        <View style={{ flex: 1 }}>
          <Spinner visible={showLoading} />

          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
            >
              <View style={{ height: 550 }}>
                <ScrollView>
                  <Image
                    source={require("../images/list.jpeg")}
                    style={styles.logo1}
                  />

                  <Textfeild
                    onChangeText={(text) => {
                      setMobile(text);
                      handleChange("mobile")(text);
                    }}
                    holder={"  Enter Phone Number..."}
                    text={"Phone Number"}
                    title={"Mobile"}
                    mt={50}
                    onBlur={handleBlur("mobile")}
                    value={values.mobile}
                  />
                  {touched.mobile && errors.mobile && (
                    <Text style={{ left: 20, color: "red", marginBottom: 5 }}>
                      {errors.mobile}
                    </Text>
                  )}

                  <Textfeild
                    holder={"  Enter pin..."}
                    mt={15}
                    title={"Password"}
                    text={"Enter Pin"}
                    onChangeText={(text) => {
                      setPin(text);
                      handleChange("pin")(text);
                    }}
                    onBlur={handleBlur("pin")}
                    value={values.pin}
                  />
                  {touched.pin && errors.pin && (
                    <Text style={{ left: 20, color: "red" }}>{errors.pin}</Text>
                  )}

                  <Darkb mt={40} value={"LOGIN"} onPress={handleSubmit} />
                </ScrollView>
              </View>
              <TouchableOpacity
                style={{ alignSelf: "center", bottom: 20 }}
                onPress={() => {
                  navigation.navigate("Signup");
                }}
              >
                <Text style={{ fontSize: 18, color: "black", top: 23 }}>
                  Dont have an account ?
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      )}
    </Formik>

    // * container end * //
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inner: {
    flex: 1,

    backgroundColor: "red",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
  },
  btnContainer: {
    backgroundColor: "white",
  },
  logo1: {
    width: Dimensions.get("window").width * 0.7,
    height: 125,

    resizeMode: "stretch",
    alignSelf: "center",
    top: 22,
    marginBottom: 27,
  },
  logo2: {
    width: Dimensions.get("window").width * 0.8,
    height: 50,

    resizeMode: "stretch",
    alignSelf: "center",
    top: 22,
    marginBottom: 27,
  },

  button3: {
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 9,
    height: 45,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 40,
    borderWidth: 1,
    marginTop: 8,
  },
});
