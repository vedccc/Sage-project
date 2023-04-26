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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as API from '../Api/Constants';
import {useSelector, useDispatch} from 'react-redux';
import {setIdRedux} from './Redux-Toolkit/userId';
import {RadioButton} from 'react-native-paper';
import {setTaskId} from '../Redux-Toolkit/userId';
import moment from 'moment';

const AssignedTasks = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [apiData, setApiData] = useState();
  const [created, setCreated] = useState();
  const [taskId, setTaskId] = useState('');

  const my_id = useSelector(state => state.user_id.user_id);

  const nameData = useSelector(state => state.name.name);

  console.log('check my_id===================', my_id);

  const name = nameData;
  const nameArray = name.split(' '); // split the name into an array of strings
  const firstNameInitial = nameArray[0].substring(0, 1); // get the first letter of the first name

  const ShortName = firstNameInitial;

  const AssignByMeApi = async () => {
    try {
      const AssignResponse = await fetch(API.AssignedByMe, {
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
      // console.log('check assign by me data', newRess);
      setApiData(newRess);
    } catch (error) {
      console.log(error);
    }
  };

  const assignTaskDeleteApi = async () => {
    try {
      const deleteResponse = await fetch(API.assignTaskDelete, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: taskId,
        }),
      });
      const deleteRess = await deleteResponse.json();
      console.log('check assignTaskDelete', deleteRess);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AssignByMeApi();
    assignTaskDeleteApi();
  }, [my_id, taskId]);

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
        <Text style={styles.txt3}>Assigned by me-</Text>
      </View>
      <View style={{height: 550}}>
        <FlatList
          data={apiData}
          renderItem={({item}) => {
            // console.log(
            //   'check name.....................',
            //   item.assignedTo_name,
            // );
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
                      top: 15,
                      color: 'black',
                      fontSize: 15.9,
                      marginBottom: 20,
                    }}>
                    Assigned To : {item.assignedTo_name}
                  </Text>

                  <Text
                    style={{
                      color: 'black',
                      marginBottom: 13,
                      top: 5,
                      fontSize: 15.9,
                      left: 15,
                      width: '90%',
                    }}>
                    Assigned At : {item.created_at}
                  </Text>
                  <View>
                    <Text
                      key={item}
                      style={{
                        color: 'black',
                        marginBottom: 1,
                        fontSize: 15.9,
                        left: 15,
                        top: 5,
                        width: '90%',
                        textDecorationLine:
                          item.is_done === 1 ? 'line-through' : 'none',
                      }}>
                      Task: {item.task_title}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setTaskId(item._id);
                      setTimeout(() => {
                        assignTaskDeleteApi();
                      }, 400);
                      setTimeout(() => {
                        AssignByMeApi();
                      }, 500);
                    }}
                    style={{alignSelf: 'flex-end', bottom: 50, right: 23}}>
                    <AntDesign
                      name="delete"
                      size={29}
                      style={{color: 'black'}}
                    />
                  </TouchableOpacity>
                </View>
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

export default AssignedTasks;
