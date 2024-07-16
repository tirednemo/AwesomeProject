import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RadialGradientBackground from '../../assets/svgs/radialGradient';

interface SignInParams {
  username: string;
  password: string;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export async function signIn({
  username,
  password,
  setIsLoggedIn,
}: SignInParams): Promise<boolean> {
  if (username === 'user' && password === 'password') {
    try {
      await AsyncStorage.setItem('isLoggedIn', '1');
      setIsLoggedIn(true);
      return true;
    } catch (e) {
      console.error(e);
    }
  }
  return false;
}

export async function signOut(setIsLoggedIn: (isLoggedIn: boolean) => void) {
  try {
    await AsyncStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  } catch (e) {
    console.error(e);
  }
}

export function SignInScreen({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isIncorrect, setIsIncorrect] = React.useState(false);

  const handleSignIn = async () => {
    const success = await signIn({username, password, setIsLoggedIn});
    setIsIncorrect(!success);
  };

  return (
    <View>
      <RadialGradientBackground />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/cat.png')}
          style={{width: 400, marginBottom: 20}}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.interactable}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.interactable}
        />
        <View style={{width: '50%', marginBottom: 40}}>
          <TouchableOpacity
            onPress={handleSignIn}
            style={{
              backgroundColor: '#FF8A00',
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Sign in</Text>
          </TouchableOpacity>
          {isIncorrect && (
            <Text style={{color: 'red', marginTop: 10}}>
              Incorrect username or password
            </Text>
          )}
        </View>
        <Text
          style={{
            fontFamily: 'PatrickHand-Regular',
            fontSize: 20,
            width: '50%',
            textAlign: 'center',
          }}>
          Don't have an account? Register
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  interactable: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '50%',
    fontFamily: 'PatrickHand-Regular',
    fontSize: 16,
  },
});
