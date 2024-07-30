import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {connectToDatabase, createTables} from './src/db/db';
import {AppNavigator} from './src/navigations/app-navigator';
import {AuthNavigator} from './src/navigations/auth-navigator';
import authContext from './src/utils/authContext';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
      <authContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {isLoggedIn ? (
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        ) : (
          <AuthNavigator />
        )}
      </authContext.Provider>
    </NavigationContainer>
  );
}

export default App;
