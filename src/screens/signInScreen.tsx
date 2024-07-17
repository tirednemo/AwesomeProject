import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RadialGradientBackground from '../assets/svgs/radialGradient';
import {connectToDatabase} from '../db/db';

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
  const query = `
    SELECT * FROM Users
    WHERE name = ? AND password = ?
  `;
  try {
    const db = await connectToDatabase();
    const results = await db.executeSql(query, [username, password]);
    if (results[0].rows.length > 0) {
      await AsyncStorage.setItem('isLoggedIn', '1');
      setIsLoggedIn(true);
      return true;
    }
  } catch (e) {
    console.error(e);
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
  navigation,
  setIsLoggedIn,
}: {
  navigation: NativeStackNavigationProp<any>;
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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={50}>
      {/* <RadialGradientBackground/>   */}
      <ScrollView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../assets/images/cat.png')}
            style={{width: 450, height: 450, marginBottom: 20}}
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
            }}
            onPress={() => navigation.navigate('SignUp')}>
            Don't have an account? Register
          </Text>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <Text
              style={{
                fontFamily: 'PatrickHand-Regular',
                fontSize: 20,
                marginRight: 10,
              }}>
              Or sign in with
            </Text>
            <TouchableOpacity style={{marginRight: 10}}>
              <Icon name="logo-google" size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="logo-reddit" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
