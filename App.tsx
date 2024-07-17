import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { HomeScreen } from './src/navigations/app-navigator';
import { SignInScreen } from './src/screens/signInScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(value !== null);
      } catch (e) {
        console.error(e);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <HomeScreen setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <SignInScreen setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}

export default App;
