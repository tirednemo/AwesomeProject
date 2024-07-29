import {createDrawerNavigator} from '@react-navigation/drawer';
import FoodScreen from '../screens/foodScreen';
import IntroScreen from '../screens/introScreen';
import {signOut} from '../screens/signInScreen';
import AlarmScreen from '../screens/alarmScreen';
import RoutineScreen from '../screens/routineScreen';
import { useContext } from 'react';
import authContext from '../utils/authContext';

const Drawer = createDrawerNavigator();

export function AppNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Feed">
      <Drawer.Screen
        name="Intro"
        component={IntroScreen}
        options={{drawerLabel: 'Intro'}}
      />
      <Drawer.Screen
        name="Food"
        component={FoodScreen}
        options={{drawerLabel: 'Favorite Foods'}}
      />
      <Drawer.Screen
        name="Alarm"
        component={AlarmScreen}
        options={{drawerLabel: 'Alarm'}}
      />
      <Drawer.Screen
        name="Routine"
        component={RoutineScreen}
        options={{drawerLabel: 'Wellness Routine'}}
      />
      <Drawer.Screen
        name="Signout"
        children={() => <SignOutComponent />}
        options={{drawerLabel: 'Signout'}}
      />
    </Drawer.Navigator>
  );
}

const SignOutComponent = () => {
  const { setIsLoggedIn } = useContext(authContext);
  signOut(setIsLoggedIn);
  return <></>;
};
