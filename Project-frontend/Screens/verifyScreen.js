import {React, useEffect, useState, useRef} from 'react';
import {useBackHandler} from '@react-native-community/hooks';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import * as API from '../Api/Constants';
import {useNavigation} from '@react-navigation/native';
import {setMobileNumber} from '../Redux-Toolkit/mobileNumber';
import {useSelector, useDispatch} from 'react-redux';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import OtpInputs from 'react-native-otp-inputs';
import OTPTextView from 'react-native-otp-textinput';

const VerifyScreen = () => {
  const [otpInput, setOtpInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [otp, setOtp] = useState(true);
  const [OTP, SetOTP] = useState('');
  const [codes, setCodes] = useState('');
  const [myOtp, setMyOtp] = useState();
  const [myPin, setMyPin] = useState();

  // const handleChangeCode = (value) => {
  //   setCode(value);
  // };

  const navigation = useNavigation();
  const mobileData = useSelector(state => state.mobileNumber);
  const newNumber = mobileData.mobileNumber;

  // const handleOtpSubmit = () => {
  //  setCode(code);
  //   // Handle OTP submission logic here
  // };

  // console.log('check input pin', pinInput);

  const VerifyOtp = async () => {
    try {
      console.log('check formate', mobileData);
      const ResponseApi = await fetch(API.VERIFYOTP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: newNumber,
          otp: myOtp,
        }),
      });

      const ress = await ResponseApi.json();
      console.log('check Verify Otp ', ress);
      if (ress.status === 1) {
        setOtp(false);
      } else if (ress.status === 0) {
        Alert.alert(ress.message);
      }
    } catch (error) {
      console.log('error');
    }
  };

  const pinApi = async () => {
    // console.log('check my pin', pin);

    try {
      const pinResponse = await fetch(API.SETPIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: newNumber,
          pin: myPin,
        }),
      });
      const pinress = await pinResponse.json();
      console.log('check pin', pinress);
      if (pinress.status === 1) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
      }}>
      <Image
        source={require('../images/f5c.jpg')}
        style={{
          width: '100%',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          resizeMode: 'contain',
          height: 360,
        }}
      />
      <View style={{position: 'absolute', alignSelf: 'center', top: 282}}>
        <Text
          style={{
            fontSize: 18,
            alignSelf: 'center',
            top: 15,
            color: 'white',
            fontWeight: 'bold',
          }}>
          Verification
        </Text>
        <Text
          style={{
            fontSize: 18,
            alignSelf: 'center',
            top: 15,
            color: 'white',
            fontWeight: 'bold',
          }}>
          You Will Get Otp Via Sms
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, justifyContent: 'center'}}>
        <View style={{height: 100,}}>
          <View
            style={{
              alignItems: 'center',
         
              height: 210,
            }}>
            <View style={{alignItems: 'center'}}>
              {otp ? (
                <Text style={{color: 'black',bottom:23}}>ENTER OTP</Text>
              ) : (
                <Text style={{color: 'black', bottom:15}}>ENTER PIN</Text>
              )}

              {otp ? (
                <OTPTextView
                  containerStyle={{marginBottom:64}}
                  handleTextChange={text => setMyOtp(text)}
                  inputCount={6}
                  tintColor="yes"
                  defaultValue={otpInput}
                  keyboardType="numeric"
                />
              ) : (
                <OtpInputs
                  inputStyles={{
                    borderWidth: 1,
                    margin: 15,
                    height: 40,
                    width: 40,
                    bottom:23,
                    paddingLeft: 15,
                    borderColor: 'c59948',
                    color: 'black',
                    fontSize: 16,
                  }}
                  handleChange={code => setMyPin(code)}
                  numberOfInputs={4}
                />
              )}

              <TouchableOpacity
                onPress={() => {
                  if (otp === true) {
                    VerifyOtp(otpInput);
                  } else if (otp === false) {
                    pinApi();
                  }
                }}
                style={{
                  width: 100,
                  borderRadius: 9,
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',

                  backgroundColor: '#c59948',

                  alignSelf: 'center',
                }}>
                {otp ? (
                  <Text style={{color: 'white'}}>Verify</Text>
                ) : (
                  <Text>SET PIN</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default VerifyScreen;

{
  /* <View style={{alignSelf:'center',borderWidth:1,marginRight:32, backgroundColor: "#B9D9EB",justifyContent:'center',height:50,width:50,borderRadius:15}}>
<TextInput
  maxLength={1}
style={{fontSize:21,alignSelf:'center'}}
/>
</View> */
}
