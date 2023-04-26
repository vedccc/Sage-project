// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Welcomescreen from './Screens/Welcomescreen.js'

import React from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    Image,
    Button,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Avatar } from "react-native-elements";
import { Formik } from 'formik';
import * as yup from 'yup';
import Topbar from '../Components/Topbar.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Iconfa from 'react-native-vector-icons/MaterialIcons'

export default function App({ navigation }) {


    const back = () => {
        navigation.push('Welcome')
    }
    const forgot = () => {
        navigation.push('Resetpassword')
    }
    const home = () => {
        navigation.push('Home')
    }

    const loginvalidation = yup.object().shape({
        email: yup.string().email('Please enter valid email').required('Email Address ir required'),
        password: yup.string().min(8, ({ min }) => `Password must be at least ${min} charcahet`).required('Password is Required'),

    });


    return (
        // <Welcomescreen/>

        // * container start * //
        <Formik
            initialValues={{ email: '', password: '' }}
            validateOnMount={true}
            onSubmit={values => console.log(values)}
            validationSchema={loginvalidation}
        >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                <View style={{ width: Dimensions.get('window').width }}>

                    {/* header */}
                    <Topbar title={"My Profile"} mb={40} />
                    {/* header end */}
                    <View style={{ backgroundColor: '#133459', height: 235, justifyContent: "center", alignItems: "center" }}>
                        <Avatar
                            size={195}
                            rounded
                            source={
                                require('../images/UserDefault.jpg')
                            }
                            Image={{ resizeMode: 'streach' }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}

                        />


                    </View>
                    <View style={{ height: 100 }}>
                        <View style={{ left: 15, top: 15, }}>
                            <Text style={{ fontSize: 25, color: "#133459", fontWeight: "500", marginBottom: 12 }}>Vedant Chellani</Text>
                            <View style={{ flexDirection: "row", marginBottom: 10 ,}}>
                                <Text>Email:</Text>
                                <Text style={{ left: 60, fontWeight: '600', fontSize: 15,position:"absolute" }}>Vedantmchellani@gmail.com</Text>
                            </View>
                            <View style={{ flexDirection: "row", }}>
                                <Text>Phone:</Text>
                                <Text style={{ left: 60, fontWeight: '600', fontSize: 15,position:"absolute" }}>8959080214</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ top: 37 }}>
                        <TouchableOpacity onPress={<bottomnavigator />} style={{
                            width: Dimensions.get('window').width * 0.92,
                            borderRadius: 9,
                            height: 45,
                            alignItems: "center",
                            justifyContent: "center",
                            // marginTop: 40,
                            backgroundColor: "#a5aeb7",
                            alignSelf: "center",
                            // position: props.position
                            marginBottom: 6,
                            flexDirection: "row"
                        }}>
                            <Icon name='pencil' size={25} style={{ color: 'white', marginRight: 4 }} />
                            <Text style={{ color: "white", fontSize: 15 ,fontWeight:"500"}}>UPDATE MY PROFILE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={<bottomnavigator />} style={{
                            width: Dimensions.get('window').width * 0.92,
                            borderRadius: 9,
                            height: 45,
                            alignItems: "center",
                            justifyContent: "center",
                            // marginTop: 40,
                            backgroundColor: "#a5aeb7",
                            flexDirection: "row",
                            alignSelf: "center",
                            // position: props.position


                        }}>
                            <Icon name='lock' size={25} style={{ color: 'white', marginRight: 3 }} />
                            <Text style={{ color: "white", fontSize: 15,fontWeight:"500" }}>UPDATE MY PASSWORD</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
        </Formik >

        // * container end * //
    );
}


const styles = StyleSheet.create({
    header: {
        top: Dimensions.get('window').height * 0.04,
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        justifyContent: "center"
    },

    headericon1: {
        fontSize: 23,
        fontWeight: "600",
        left: 10,
        position: "absolute",
        color: "#133459",

    },
    headertitle: {
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "250",
        color: "#133459",
        position: "absolute",
    },

    headericon2: {
        fontSize: 25,
        alignSelf: "flex-end",
        right: 5,
        color: "#133459",

    },

    logo1: {

        width: Dimensions.get('window').width * 0.8,
        height: 60,
        top: Dimensions.get('window').height * 0.23,
        resizeMode: 'stretch',
        alignSelf: "center"
    },

    emailinputcontainer: {
        top: Dimensions.get('window').height * 0.27,
        position: "relative",
        alignSelf: "center",

    },

    emailinputlable: {
        marginBottom: 8,
        fontSize: 17,
        color: "#133459",
        fontWeight: "500"
    },

    emailinputtextfeild: {
        height: 35,
        width: Dimensions.get('window').width * 0.92,
        borderWidth: 1.6,
        borderRadius: 6,
        borderColor: "#eaedf2"
    },

    passwordinputcontainer: {
        top: Dimensions.get('window').height * 0.27,
        position: "relative",
        alignSelf: "center",
        marginTop: 10
    },

    passwordinputlable: {
        marginBottom: 8,
        fontSize: 17,
        color: "#133459",
        fontWeight: "500"
    },

    passwordinputtextfeild: {
        height: 35,
        width: Dimensions.get('window').width * 0.92,
        borderWidth: 1.6,
        borderRadius: 6,
        borderColor: "#eaedf2"
    },

    button1: {
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 9,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#133459",
        top: Dimensions.get('window').height * 0.69,
        alignSelf: "center",
        position: "absolute"
    },

    button2: {
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 9,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 40,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        top: Dimensions.get('window').height * 0.770,
        alignSelf: "center",
        position: "absolute"

    }

});



