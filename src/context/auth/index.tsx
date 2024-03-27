import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import {UserType} from '../../types/user';
import {checkLogin} from './lib/checkLogin';
import {logout} from './lib/logout';

import {Props as LoginProps, login} from './lib/login';

interface ContextProps {
  user: UserType | null;
  loginState: boolean;
  login: (data: LoginProps) => Promise<UserType | null>;
  logout: ()=> any
  taskComplete: Dispatch<SetStateAction<number>>
}

const AuthContext = createContext<ContextProps | undefined>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType| null>(null);
  const [refresh, setRefresh] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    checkLogin().then((data: UserType| null) => {

      setIsLoggedIn(() => !!data);
      setUser(()=> data);
    });

  }, [refresh]);

  return (
    <AuthContext.Provider value={{loginState: isLoggedIn, login, logout,taskComplete:setRefresh, user}}>
      {children}
    </AuthContext.Provider>
  );
};
