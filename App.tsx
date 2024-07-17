import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { connectToDatabase, createTables } from './src/db/db';
import { AppNavigator } from './src/navigations/app-navigator';
import { AuthNavigator } from './src/navigations/auth-navigator';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()
      await createTables(db)
    } catch (error) {
      console.error(error)
    }
  }, [])
  
  useEffect(() => {
    loadData()
  }, [loadData])
  
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
        <AppNavigator setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}

export default App;
