import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as GlobalVariables from "../Storage/globalData";
import { Formik } from "formik";
import * as yup from "yup";
import * as API from "../Api/Constants";
import { useSelector, useDispatch } from "react-redux";
import { setMobileNumber } from "../Redux-Toolkit/mobileNumber";
import { setNameRedux } from "../Redux-Toolkit/nameSlice";
import Textfeild from "../Components/Textfeild";
import Darkb from "../Components/Darkbutton";

const SignUp = (values) => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [inputs, setInputs] = useState("");
  const [inputsNew, setInputNew] = useState("");

  const dispatch = useDispatch();
  console.log("---------------------number", mobile);

  const mobileno = () => {
    dispatch(setMobileNumber(mobile));
  };

  const nameRedux = () => {
    dispatch(setNameRedux(name));
  };

  const SignUpApi = async () => {
    try {
      const Response = await fetch(API.SIGNUP, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          mobile: mobile,
        }),
      });
      const myress = await Response.json();
      console.log("check Sign Up api data 90909090909", myress);
    } catch (error) {
      console.log(error);
    }
  };

  const SignUpHandle = () => {
    SignUpApi();
  };

  const nav = () => {
    navigation.navigate("Verify");
  };

  const NewInputName = (text) => {
    setName(text);
  };

  const NewInputMobile = (text) => {
    setMobile(text);
  };

  const mob =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const registerValidationSchema = yup.object().shape({
    mobile: yup
      .string()
      .matches(mob, "Phone number is not valid")
      .required("Please enter your Phone no."),

    name: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "Name can only contain Latin letters."
      )
      .required("Please enter your name."),
  });

  return (
    <Formik
      validateOnChange={true}
      onSubmit={SignUpApi}
      validationSchema={registerValidationSchema}
      initialValues={{
        name: "",
        mobile: "",
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
        <View style={styles.boxOne}>
          <Image source={require("../images/list.jpeg")} style={styles.logo1} />

          <Textfeild
            onChangeText={(text) => {
              setName(text);
              handleChange("name")(text);
            }}
            holder={" Enter your name "}
            text={"Enter name"}
            title={"Mobile"}
            mt={50}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          {touched.name && errors.name && (
            <Text
              style={{
                left: 20,
                color: "red",
              }}
            >
              {errors.name}
            </Text>
          )}

          <Textfeild
            holder={" Enter phone number "}
            mt={15}
            title={"Password"}
            text={"Enter Phone number"}
            onChangeText={(text) => {
              setMobile(text);
              handleChange("mobile")(text);
            }}
            onBlur={handleBlur("mobile")}
            value={values.mobile}
          />
          {touched.mobile && errors.mobile && (
            <Text
              style={{
                left: 20,
                color: "red",
              }}
            >
              {errors.mobile}
            </Text>
          )}

          <Darkb
            mt={64}
            value={"SIGN UP"}
            onPress={() => {
              nav(), handleSubmit(SignUpHandle()), mobileno(), nameRedux();
            }}
          />

          {/* 
            <TouchableOpacity
              onPress={() => {
                nav(), handleSubmit(SignUpHandle()), mobileno(), nameRedux();
              }}
              style={styles.TouchableContainer}>
              <Text style={styles.tx}>Sign Up</Text>
            </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.bttx6}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "black" }}>already have an account ?</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  boxOne: {
    backgroundColor: "#F6F3EE",
    height: "100%",
    justifyContent: "center",
  },
  InputBox: {
    alignSelf: "center",
    color: "red",
    bottom: 36,
    backgroundColor: "white",
    elevation: 4,
    width: Dimensions.get("window").width * 0.84,
    height: 50,
    marginBottom: 23,
    padding: 5,
    justifyContent: "center",
  },
  TouchableContainer: {
    bottom: 40,
    height: 40,
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.84,
    left: 32,
    backgroundColor: "#147fdc",
  },
  Input: {
    fontSize: 18,
    padding: 1,
    color: "#8B7765",
  },
  btmtxt: {
    top: 350,
    alignSelf: "center",
  },
  bttxt: {
    fontSize: 18,
    color: "#8B7765",
    fontWeight: "bold",
    bottom: 150,
  },
  tx: {
    fontSize: 23,
    alignSelf: "center",
    color: "#F6F3EE",
  },
  bttx: {
    fontSize: 23,
    color: "#8B7765",
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.64,
    bottom: 150,
    left: 23,
  },
  bttx5: {
    fontSize: 23,
    color: "#8B7765",
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.64,
    bottom: 150,
    left: 50,
  },
  bttx6: {
    fontSize: 16,
    color: "#8B7765",
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.64,
    top: 15,
    right: 39,
    fontWeight: "bold",
  },
  img: {
    width: "50%",
    alignSelf: "center",
    height: 190,
    bottom: 90,
    borderRadius: 300,
    resizeMode: "contain",
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
});

export default SignUp;
