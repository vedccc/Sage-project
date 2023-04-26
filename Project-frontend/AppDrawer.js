import {React} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Taskscreen from './Screens/Tasks';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AssignedTasks from './Screens/assignedTasks';
import AssignedToMe from './Screens/assignedToMe';
const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Drawer.Navigator screenOptions={{headerShown: false}}>
        <Drawer.Screen
          name="TaskScreen"
          options={{
            drawerIcon: ({focused, Size}) => (
              <FontAwesome5
                name="tasks"
                size={32}
                color={focused ? 'green' : '#8B7765'}
              />
            ),
            drawerLabel: 'Tasks',
            title: 'Tasks',
          }}
          component={Taskscreen}
        />

        <Drawer.Screen
          name="ScheduleScreen"
          options={{
            drawerIcon: ({focused, Size}) => (
              <AntDesign
                name="calendar"
                size={32}
                color={focused ? 'green' : '#8B7765'}
              />
            ),
            drawerLabel: 'Schedule Tasks',
            title: 'Task',
          }}
          component={Taskscreen}
        />

        <Drawer.Screen
          name="Important"
          options={{
            drawerIcon: ({focused, Size}) => (
              <Entypo
                name="add-to-list"
                size={32}
                color={focused ? 'green' : '#8B7765'}
              />
            ),
            drawerLabel: 'Important Tasks',
            title: 'Important Tasks',
          }}
          component={Taskscreen}
        />

<Drawer.Screen
          name="Assigned Tasks"
          options={{
            drawerIcon: ({focused, Size}) => (
              <Entypo
                name="add-to-list"
                size={32}
                color={focused ? 'green' : '#8B7765'}
              />
            ),
            drawerLabel: 'Assigned By Me',
            title: 'Assign Tasks',
          }}
          component={AssignedTasks}
        />

<Drawer.Screen
          name="Assigned To Me"
          options={{
            drawerIcon: ({focused, Size}) => (
              <Entypo
                name="add-to-list"
                size={32}
                color={focused ? 'green' : '#8B7765'}
              />
            ),
            drawerLabel: 'Assigned To Me',
            title: 'Assigned To Me',
          }}
          component={AssignedToMe}
        />

      </Drawer.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AppDrawer;
