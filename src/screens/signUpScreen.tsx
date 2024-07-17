import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadialGradientBackground from '../assets/svgs/radialGradient';
import {connectToDatabase} from '../db/db';
import {addUser} from '../db/users';
import {User} from '../types/User';

interface SignUpParams {
  name: string;
  password: string;
  email: string;
  acceptTerms: boolean;
}

export async function signUp({
  name,
  password,
  email,
  acceptTerms,
}: SignUpParams): Promise<boolean> {
  if (name && password && email && acceptTerms) {
    try {
      const db = await connectToDatabase();
      const user: User = {name, password, email};
      await addUser(db, user);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  return false;
}

export function SignUpScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSignUp = async () => {
    const success = await signUp({name, password, email, acceptTerms});
    if (success) {
      console.log('Sign up successful');
      navigation.navigate('SignIn');
    } else {
      console.log('Sign up failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={50}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* <RadialGradientBackground /> */}
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
            source={require('../assets/images/cat.png')}
            style={{
              marginTop: 100,
              marginBottom: 20,
              width: 150,
              height: 150,
              alignSelf: 'center',
            }}
          />
          <TextInput
            placeholder="Username"
            value={name}
            onChangeText={setUsername}
            style={styles.interactable}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.interactable}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.interactable}
          />
          <View style={styles.checkboxContainer}>
            <BouncyCheckbox
              onPress={() => {
                setAcceptTerms(!acceptTerms);
              }}
            />
            <Text style={styles.label}>Accept Terms & Conditions</Text>
          </View>
          <TouchableOpacity
            disabled={!acceptTerms}
            onPress={handleSignUp}
            style={[styles.button, {marginTop: 50, marginBottom: 100}]}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'PatrickHand-Regular',
              fontSize: 20,
              textAlign: 'center',
            }}
            onPress={() => navigation.navigate('SignIn')}>
            Already have an account? Login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interactable: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
    fontFamily: 'PatrickHand-Regular',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF8A00',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    color: 'white',
    width: '80%',
    fontFamily: 'PatrickHand-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    margin: 8,
    fontFamily: 'PatrickHand-Regular',
    fontSize: 16,
  },
});
