import { React, useState, useEffect, useCallback } from "react";
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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as API from "../Api/Constants";
import { useSelector, useDispatch } from "react-redux";
import { setIdRedux } from "./Redux-Toolkit/userId";
import { RadioButton } from "react-native-paper";
import { setTaskId, setDueDate } from "../Redux-Toolkit/userId";
import { setdueDate } from "../Redux-Toolkit/dueDate";
import moment from "moment";

const Taskscreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [estado, setEstado] = useState(false);
  const [task, setTask] = useState();
  const [list, setlist] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [load, setLoad] = useState();
  const [titles, setTitles] = useState();
  const [btnload, setBtnload] = useState(true);
  const [apiData, setApiData] = useState();
  const [deleteTask, setDeleteTask] = useState();
  const [dataStatus, setDataStatus] = useState();
  const [getStatus, setGetStatus] = useState();
  const [checked, setChecked] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [remove, setRemove] = useState("");
  const [dueDate, setDueDate] = useState("");

  const my_id = useSelector((state) => state.user_id.user_id);

  const nameData = useSelector((state) => state.name.name);

  const newDate = moment(dueDate).format("MM-DD-YYYY");

  console.log("check Date===================", newDate);

  dispatch(setdueDate(newDate));

  const name = nameData;
  const nameArray = name.split(" "); // split the name into an array of strings
  const firstNameInitial = nameArray[0].substring(0, 1); // get the first letter of the first name

  const ShortName = firstNameInitial;

  console.log("check initial remove data 454545454545", remove);

  const TitleApi = async () => {
    try {
      const response = await fetch(API.TITLE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titles,
          user_id: my_id,
        }),
      });
      const ress = await response.json();
      console.log("1212121212121212", ress);
    } catch (error) {
      console.log(error);
    }
  };

  const TaskListApi = async () => {
    try {
      const listResponse = await fetch(API.TASKLIST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: my_id,
        }),
      });
      const listRess = await listResponse.json();
      const newListRes = listRess.data;

      // console.log('list data task  5555555555555--------------------', newListRes);
      setApiData(newListRes);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("checck 5555555555555", remove);

  const DeleteApi = async () => {
    console.log("check remove id 99999", remove);

    try {
      const DeleteResponse = await fetch(API.DELETE, {
        method: "POST",
        headers: {
          "Content-Type": "Application/Json",
        },
        body: JSON.stringify({
          _id: remove,
        }),
      });
      const DeleteRess = await DeleteResponse.json();
      // console.log("check DeleteAPI", DeleteRess);
      if (DeleteRess.status == 1) {
        Alert.alert(DeleteRess.message);
      }
      TaskListApi();
    } catch (error) {
      console.log(error);
    }
  };

  const taskStatusApi = async (item_id) => {
    console.log("check status data $$$$$$$$$$$$$", item_id);

    try {
      const StatusResponse = await fetch(API.Task_Status, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: item_id,
        }),
      });
      const Statusress = await StatusResponse.json();
      const neww = Statusress.status;
      setDataStatus(neww);
      console.log("check Status", Statusress);
      if (Statusress.message == "Status Update Successfully") {
        TaskListApi();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MylistApi = () => {
    TaskListApi();
  };

  const ressss = () => {
    TitleApi();
    setTimeout(() => {
      MylistApi();
    }, 300);
  };

  useEffect(() => {
    TaskListApi();
    DeleteApi();
    taskStatusApi();
  }, [remove, getStatus]);

  const buttonLoad = () => {
    setBtnload(!btnload);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
    setDueDate(date);
  };

  const handeladd = () => {
    setlist([...list, task]);
    setTask(null);
  };

  const loadTextField = () => {
    setLoad(!load);
  };

  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      console.log("hide"); // or some other action
      setLoad(false);
    }
  );

  useEffect(() => {
    keyboardDidHideListener;
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.navigate("Login") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      TaskListApi();
    }, [])
  );

  return (
    <View style={styles.boxOne}>
      <View
        style={{
          height: Dimensions.get("window").height * 0.18,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            top: 20,
            width: "40%",
            left: 10,
          }}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <View style={styles.profile}>
            <Text style={styles.txt1}>{ShortName}</Text>
          </View>

          <Text style={styles.txt2}>{nameData}</Text>
        </TouchableOpacity>
        <Text style={styles.txt3}>Add Tasks-</Text>
      </View>

      <View style={{ height: 450 }}>
        <FlatList
          data={apiData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TaskDetails"),
                    dispatch(setTaskId(item._id));
                }}
              >
                <View
                  style={{
                    backgroundColor: "#c59948",
                    borderRadius: 12,
                    margin: 10,
                    minHeight: 70,
                    flexDirection: "row",
                    width: Dimensions.get("window").width * 0.94,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ left: 5 }}>
                    <RadioButton.Android
                      value="singleRadio"
                      color="blue"
                      status={item.is_done === 1 ? "checked" : "unchecked"}
                      onPress={() => {
                        setGetStatus(item._id), taskStatusApi(item._id);
                      }}
                    />
                  </View>

                  <View>
                    <TouchableOpacity
                      style={{
                        fontWeight: "bold",
                        width: 280,
                      }}
                      onPress={() => {
                        setGetStatus(item._id), taskStatusApi(item._id);
                      }}
                    >
                      <Text
                        key={item}
                        style={{
                          color: "black",
                          fontSize: 15.9,
                          textDecorationLine:
                            item.is_done === 1 ? "line-through" : "none",
                        }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setRemove(item._id);
                      DeleteApi();
                    }}
                    style={{ right: 10 }}
                  >
                    <FontAwesome5
                      name="file-upload"
                      size={29}
                      style={{ color: "black", margin: 5 }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <TouchableOpacity
        style={{ top: 50, width: "15%", alignSelf: "flex-end", right: 23 }}
        onPress={() => {
          setLoad(true);
        }}
      >
        <Icon
          name="pluscircle"
          size={50}
          style={{
            fontWeight: "600",

            alignSelf: "flex-end",
            color: "#133459",
          }}
        />
      </TouchableOpacity>

      {load ? (
        <KeyboardAvoidingView
          behavior="position"
          style={{
            top: 150,

            height: 110,

            width: "100%",
            position: "absolute",
          }}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          <View
            style={{
              position: "absolute",
              width: "100%",
              backgroundColor: "white",
              marginBottom: 190,

              top: Platform.OS == "android" ? 120 : 4,
            }}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", height: 40 }}
            >
              <Entypo
                name="circle"
                size={26}
                style={{ color: "#A0A0A0", left: 9, top: 5 }}
              />
              <TextInput
                autoFocus={true}
                defaultValue={task}
                placeholder="Add a task"
                onChangeText={(text) => {
                  setTask(text);
                  setTitles(text);
                }}
                style={{
                  height: Dimensions.get("window").height * 0.059,
                  left: 15,
                  height: 40,
                  top: 5,
                  width: Dimensions.get("window").width * 0.7,
                  fontSize: 16,
                  color: "black",
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  handeladd(),
                    loadTextField(false),
                    buttonLoad(true),
                    ressss(),
                    MylistApi();
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-up-bold-box"
                  size={32}
                  style={{
                    left: 23,
                    top: 5,
                    color: "#A0A0A0",
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                top: 5,
                borderBottomColor: "#147fdc",
                marginBottom: 5,
              }}
            ></View>
            <ScrollView
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ top: 9, bottom: 15, marginBottom: 23 }}
            >
              <TouchableOpacity
                style={{
                  left: 5,
                  backgroundColor: "#147fdc",
                  width: 132,
                  justifyContent: "center",
                  paddingLeft: 23,
                  paddingTop: 15,
                  borderRadius: 32,
                  marginRight: 15,
                  marginBottom: 23,
                  height: 40,
                }}
                onPress={showDatePicker}
              >
                <FontAwesome5
                  name="calendar-alt"
                  size={24}
                  style={{ color: "white" }}
                />
                <Text style={{ left: 32, bottom: 23, color: "white" }}>
                  Set Due
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  left: 5,
                  backgroundColor: "#147fdc",
                  width: 132,
                  justifyContent: "center",
                  paddingLeft: 5,
                  paddingTop: 15,
                  borderRadius: 32,
                  marginRight: 15,
                  marginBottom: 23,
                  height: 40,
                }}
              >
                <Ionicons
                  name="notifications"
                  size={24}
                  style={{ color: "white" }}
                />
                <Text style={{ left: 32, bottom: 23, color: "white" }}>
                  Set Reminder
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      ) : null}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boxOne: {
    height: Dimensions.get("window").height,
    // backgroundColor: '#ffda96',
  },

  profile: {
    backgroundColor: "#c59948",
    height: 50,
    width: 50,
    justifyContent: "center",
    borderRadius: 100,
  },
  txt1: {
    color: "white",
    fontSize: 18,

    alignSelf: "center",
  },

  txt2: {
    color: "#c59948",
    fontWeight: "bold",
    fontSize: 18,
    left: 5,
  },
  txt3: {
    color: "#c59948",
    fontWeight: "bold",
    fontSize: 18,
    top: 40,
    left: 15,
  },

  box2: {
    top: 5,
    backgroundColor: "red",
  },

  txt4: {
    fontWeight: "bold",
    color: "#8B7765",
    fontSize: 16,
  },

  txt9: {
    fontWeight: "bold",
    color: "#8B7765",
    fontSize: 16,
    left: 5,
  },

  icon3: {
    color: "#147fdc",
  },
  opacity: {
    alignSelf: "flex-end",
    top: 12,
    right: 5,
  },
  opacityOne: {
    left: 140,
    bottom: 5,
    alignSelf: "flex-end",
    height: Dimensions.get("window").height * 0.05,
    width: Dimensions.get("window").width * 0.5,
  },

  icon12: {
    color: "#147fdc",
    alignSelf: "center",
  },

  list: {
    alignSelf: "flex-end",
    right: 30,
  },
});

export default Taskscreen;
