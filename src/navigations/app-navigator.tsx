import {createDrawerNavigator} from '@react-navigation/drawer';
import FoodScreen from '../screens/foodScreen';
import IntroScreen from '../screens/introScreen';
import {signOut} from '../screens/signInScreen';
import AlarmScreen from '../screens/alarmScreen';
import RoutineScreen from '../screens/routineScreen';

const Drawer = createDrawerNavigator();

export function AppNavigator({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}) {
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
        children={() => <SignOutComponent setIsLoggedIn={setIsLoggedIn} />}
        options={{drawerLabel: 'Signout'}}
      />
    </Drawer.Navigator>
  );
}

const SignOutComponent = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}) => {
  signOut(setIsLoggedIn);
  return <></>;
};
