import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Storage} from '../types/enums';
import axios from 'axios';
import {API} from '../utils/api';
import {
  Toast,
  VStack,
  ToastTitle,
  ToastDescription,
  useToast,
} from '@gluestack-ui/themed';
import {UserType} from '../types/user';

interface AuthStateType {
  token: string | null;
  authenticated: boolean | null;
  user: UserType | null;
}
interface AuthProps {
  authState?: AuthStateType;
  onLogin?: (email: string, password: string) => any;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const toast = useToast();

  const [authState, setAuthState] = useState<AuthStateType>({
    token: null,
    authenticated: null,
    user: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem(Storage.TOKEN);
      const user = await AsyncStorage.getItem(Storage.USER);

      if (token) {
        console.log('tokeen ', token);

        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
          user: JSON.parse(user!),
        });
      }
    };

    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    const url = API('/user/login');

    try {
      const result = await axios.post(url, {email, password});

      axios.defaults.headers.common.Authorization = `Bearer ${result.data.data.token}`;
      setAuthState({
        token: result.data.data.token,
        authenticated: true,
        user: result.data.data.user,
      });

      AsyncStorage.setItem(Storage.TOKEN, result.data.data.token);
      AsyncStorage.setItem(Storage.USER, JSON.stringify(result.data.data.user));

      return result;
    } catch (error) {
      console.log(error);

      toast.show({
        placement: 'top',
        render: ({id}) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} action="error" variant="outline">
              <VStack space="xs">
                <ToastTitle>Login Failed</ToastTitle>
                <ToastDescription>
                  Please check your credentials
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }
  };

  const logout = async () => {
    axios.defaults.headers.common.Authorization = '';

    AsyncStorage.removeItem(Storage.USER);
    setAuthState({
      token: null,
      authenticated: false,
      user: null,
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
