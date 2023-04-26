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

import Icon from 'react-native-vector-icons/AntDesign'
import Iconfa from 'react-native-vector-icons/FontAwesome'

export default function App(props) {

    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={props.onpress} >
                <View style={styles.imagebox}>
                    <Image source={props.img} style={styles.image} />
                </View>
            </TouchableOpacity>
            <View ><Text style={styles.title}>{props.title}</Text></View>
        </View>


    );




}


const styles = StyleSheet.create({
    container: {
        
        height: 140,
        width: 160,
        marginBottom:5
    },

    imagebox: {
        width: 160,
        height: 120,
        borderRadius: 10,
        justifyContent: "center",
        borderWidth: 1,
        backgroundColor: "white"
    },

    image: {
        resizeMode: 'stretch',
        height: "70%",
        width: "70%",
        position: "absolute",
        alignSelf: "center"
    },

    title: { 
        alignSelf: 'center',
        fontSize:12.5,
        marginTop:5,
        resizeMode: 'stretch'
 }

});