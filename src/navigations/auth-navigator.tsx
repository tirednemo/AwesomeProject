import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from '../screens/signInScreen';
import {SignUpScreen} from '../screens/signUpScreen';

const Stack = createNativeStackNavigator();

export function AuthNavigator({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn">
        {props => <SignInScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
