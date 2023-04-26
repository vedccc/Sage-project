import {React, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Modal from 'react-native-modal';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import * as API from '../Api/Constants';
import {useSelector} from 'react-redux';
import moment from 'moment';

const TaskDetails = () => {
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [userList, setUserList] = useState();
  const [title, setTitle] = useState();
  const [created, setCreated] = useState();
  const [user_id, setUser_id] = useState('');

  const my_id = useSelector(state => state.user_id.user_id);
  const taskId = useSelector(state => state.user_id.task_id);
  const dueDateNew=useSelector(state=>state.dueDate.dueDate);


  console.log('check due date from redux', dueDateNew);

  const taskByIdApi = async () => {
    try {
      console.log('task id', taskId);
      const taskByIdResponse = await fetch(API.taskById, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: taskId,
        }),
      });
      const taskByIdRess = await taskByIdResponse.json();
      console.log('check taskbyid data', taskByIdRess);
      const taskTitle = taskByIdRess.title;
      const createdAt = taskByIdRess.created_at;
      setTitle(taskTitle);
      setCreated(createdAt);
    } catch (error) {
      console.log(error);
    }
  };

  const UserListApi = async () => {
    try {
      const Response = await fetch(API.User_List, {
        method: 'GET',
        headers: {
          Content_Type: 'application/json',
        },
      });
      const apiResponse = await Response.json();
      const ress = apiResponse.data;
      // console.log('check user list', ress);
      setUserList(ress);
    } catch (error) {
      console.log(error);
    }
  };

  const taskAssignApi = async () => {
    try {
      const AssignResponse = await fetch(API.AssignTask, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          task_id: taskId,
          assigned_by: my_id,
          due_date:dueDateNew,
        }),
      });
      const assignRess = await AssignResponse.json();
      console.log('check assign api data', assignRess);
      if (assignRess.status == 1) {
        Alert.alert(assignRess.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TaskListApi = async () => {
    try {
      const listResponse = await fetch(API.TASKLIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: my_id,
        }),
      });
      const listRess = await listResponse.json();
      const newListRes = listRess.data;

      console.log('list data task  5555555555555--------------------', newListRes);
      // setApiData(newListRes);
    } catch (error) {
      console.log(error);
    }
  };


  const newDateTime = moment(created).format('MM-DD-YYYY HH:mm:ss');
  console.log('check date and time', newDateTime);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    UserListApi();
    taskByIdApi();
    taskAssignApi();
  }, [user_id]);


  return (
    <View>
      <ScrollView>
        <View>
          <TouchableOpacity
            style={{top: 50, left: 10, width: 64}}
            onPress={() => {navigation.navigate('TaskScreen'),TaskListApi()}}>
            <AntDesign name="arrowleft" size={32} style={{color: 'black'}} />
          </TouchableOpacity>
          <Text style={{fontSize: 18, left: 50, top: 20, color: 'black'}}>
            Tasks
          </Text>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity>
              <Feather
                name="bookmark"
                size={26}
                style={{right: 100, color: 'black'}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5
                name="file-download"
                size={25}
                style={{right: 64, bottom: 25, color: 'black'}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="delete"
                size={32}
                style={{right: 15, bottom: 55, color: 'black'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              width: '90%',
              height: 23,
              fontWeight: 'bold',
              left: 23,
              color: 'black',
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              top: 15,
              left: 23,
              marginBottom: 23,
              color: 'black',
            }}>
            Created at {newDateTime}
          </Text>
        </View>

        <View style={{borderBottomWidth: 0.5, top: 15}}></View>

        <View>
          <View
            style={{flexDirection: 'row', top: 40, left: 23, marginBottom: 23}}>
            <Entypo name="circle" size={24} style={{color: 'black'}} />
            <TouchableOpacity style={{width: '73%'}}>
              <Text style={{left: 15, top: 3, fontSize: 16, color: 'black'}}>
                Marked done
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{flexDirection: 'row', top: 40, left: 23, marginBottom: 23}}>
            <AntDesign name="calendar" size={26} style={{color: 'black'}} />
            <TouchableOpacity style={{width: '73%'}}>
              <Text style={{left: 15, top: 3, fontSize: 16, color: 'black'}}>
                Due was last tuesday
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{flexDirection: 'row', top: 40, left: 23, marginBottom: 23}}>
            <FontAwesome name="bell" size={26} style={{color: 'black'}} />
            <TouchableOpacity style={{width: '73%'}}>
              <Text style={{left: 15, top: 3, fontSize: 16, color: 'black'}}>
                Set reminder
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{flexDirection: 'row', top: 40, left: 23, marginBottom: 23}}>
            <MaterialCommunityIcons
              name="image-area"
              size={26}
              style={{color: 'black'}}
            />
            <TouchableOpacity style={{width: '73%'}}>
              <Text style={{left: 15, top: 3, fontSize: 16, color: 'black'}}>
                Add image
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{flexDirection: 'row', top: 40, left: 23, marginBottom: 23}}>
            <FontAwesome5 name="tasks" size={26} style={{color: 'black'}} />
            <TouchableOpacity style={{width: '73%'}} onPress={toggleModal}>
              <Text style={{left: 15, top: 3, fontSize: 16, color: 'black'}}>
                Assign To
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <TextInput
            placeholder="add description"
            style={{
              borderWidth: 1,
              height: 100,
              width: '95%',
              alignSelf: 'center',
              paddingLeft: 15,
              fontSize: 18,
              top: 50,
              marginBottom: 64,
              color: 'black',
              borderRadius: 10,
            }}
          />
        </View>

        <Modal isVisible={isModalVisible}>
          <View
            style={{backgroundColor: 'white', height: 320, borderRadius: 15}}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                right: 10,
                top: 5,
                height: 50,

                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={toggleModal}>
              <Entypo
                name="circle-with-cross"
                size={23}
                style={{color: '#147fdc'}}
              />
            </TouchableOpacity>

            <FlatList
              data={userList}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 15,
                      left: 10,
                      top: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#147fdc',
                        borderRadius: 23,
                        height: 23,
                        width: 23,
                      }}>
                      <Text style={{padding: 5, color: 'white'}}></Text>
                    </View>
                    <TouchableOpacity
                      style={{width: 190}}
                      onPress={() => {
                        toggleModal,
                          setUser_id(item._id),
                          setTimeout(() => {
                            taskAssignApi();
                            TaskListApi();
                          }, 500);

                      }}>
                      <Text
                        style={{
                          left: 15,
                          fontSize: 16,
                          color: 'black',
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TaskDetails;
