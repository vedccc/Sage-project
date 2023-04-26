import {React, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  BackHandler,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as API from '../Api/Constants';
import {useSelector, useDispatch} from 'react-redux';
import {setIdRedux} from './Redux-Toolkit/userId';
import {RadioButton} from 'react-native-paper';
import {setTaskId} from '../Redux-Toolkit/userId';
import moment from 'moment';

const AssignedToMe = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [apiData, setApiData] = useState();
  const [created, setCreated] = useState();
  const my_id = useSelector(state => state.user_id.user_id);

  const nameData = useSelector(state => state.name.name);

  console.log('check my_id===================', my_id);

  const name = nameData;
  const nameArray = name.split(' '); // split the name into an array of strings
  const firstNameInitial = nameArray[0].substring(0, 1); // get the first letter of the first name

  const ShortName = firstNameInitial;

  const AssignToMeApi = async () => {
    try {
      const AssignResponse = await fetch(API.AssignedToMe, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: my_id,
        }),
      });
      const assignRess = await AssignResponse.json();
      const newRess = assignRess.data;
      console.log('check assign by me data', newRess);
      setApiData(newRess);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AssignToMeApi();
  }, [my_id]);

  return (
    <View style={styles.boxOne}>
      <View
        style={{
          height: Dimensions.get('window').height * 0.18,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            top: 20,
            left: 10,
          }}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View style={styles.profile}>
            <Text style={styles.txt1}>{ShortName}</Text>
          </View>

          <Text style={styles.txt2}>{nameData}</Text>
        </TouchableOpacity>
        <Text style={styles.txt3}>Tasks Assigned To me-</Text>
      </View>
      <View style={{height: 600}}>
        <FlatList
          data={apiData}
          renderItem={({item}) => {
            console.log(
              'check name.....................',
              item.assignedTo_name,
            );
            return (
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#c59948',
                    borderRadius: 12,
                    margin: 10,

                    width: Dimensions.get('window').width * 0.94,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    key={item}
                    style={{
                      left: 15,
                      top: 10,
                      color: 'black',
                      fontSize: 18,
                      marginBottom: 20,
                    }}>
                    Assigned By : {item.assignedBy_name}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      marginBottom: 10,
                      fontSize: 15.9,
                      left: 15,

                      width: '90%',
                    }}>
                    Assigned At : {item.created_at}
                  </Text>

                  <Text
                    style={{
                      color: 'black',
                      marginBottom: 10,
                      fontSize: 15.9,
                      left: 15,

                      width: '90%',
                    }}>
                   Task Due Date : {item.due_date}
                  </Text>

                  <View>
                    <Text
                      key={item}
                      style={{
                        color: 'black',
                        marginBottom: 15,
                        fontSize: 15.9,
                        left: 15,

                        width: '90%',
                        textDecorationLine:
                          item.is_done === 1 ? 'line-through' : 'none',
                      }}>
                      Task: {item.task_title}
                    </Text>
                  </View>
                </View>
                {/* <TouchableOpacity
                    onPress={() => {
                      setRemove(item._id);
                      DeleteApi();
                    }}
                    style={{right:10}}>
                    <FontAwesome5
                      name="file-upload"
                      size={29}
                      style={{color: 'black', margin: 5}}
                    />
                  </TouchableOpacity> */}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxOne: {
    height: Dimensions.get('window').height,
    // backgroundColor: '#ffda96',
  },

  profile: {
    backgroundColor: '#c59948',
    height: 50,
    width: 50,
    justifyContent: 'center',
    borderRadius: 100,
  },
  txt1: {
    color: 'white',
    fontSize: 18,

    alignSelf: 'center',
  },

  txt2: {
    color: '#c59948',
    fontWeight: 'bold',
    fontSize: 18,
    left: 5,
  },
  txt3: {
    color: '#c59948',
    fontWeight: 'bold',
    fontSize: 18,
    top: 40,
    left: 18,
  },
});

export default AssignedToMe;
