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

    <View style={{ borderBottomWidth: 2, borderBottomColor: "grey", height: Dimensions.get('window').height * 0.124, justifyContent: "center" }}>

      <TouchableOpacity onPress={props.onPress}><Icon name="left" style={{ fontSize: 23, fontWeight: "600", left: 10, position: "absolute", color: "#133459", }} /></TouchableOpacity>

      <Text style={{ alignSelf: "center", fontSize: 25, fontWeight: "250", color: "#133459", position: "absolute", bottom: 15 }} >{props.title}</Text>



    </View>

  );
}


