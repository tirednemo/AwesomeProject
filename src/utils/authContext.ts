import {createContext} from 'react';

const authContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: auth => {},
});

export default authContext;
