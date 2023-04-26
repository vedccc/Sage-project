import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Loginscreen from './Screens/Loginscreen';
import Tasks from './Screens/Tasks';
import AppDrawer from './AppDrawer';
import TaskDetails from './Screens/TaskDetails';
import Signup from './Screens/SignUp';
import Verify from './Screens/verifyScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Loginscreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
        <Stack.Screen name="AppDrawer" component={AppDrawer} />
        <Stack.Screen name="Task" component={Tasks} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Verify" component={Verify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
