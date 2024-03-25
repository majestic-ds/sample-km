import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {UserType} from '../../types/user';
import {checkLogin} from './lib/checkLogin';
import {Props as LoginProps, login} from './lib/login';

interface ContextProps {
  user?: UserType;
  loginState: boolean;
  login: (data: LoginProps) => Promise<UserType | null>;
}

const AuthContext = createContext<ContextProps | undefined>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    checkLogin().then(data => setIsLoggedIn(() => !!data));
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={{loginState: isLoggedIn, login}}>
      {children}
    </AuthContext.Provider>
  );
};
