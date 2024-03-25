import React from 'react';
import TabbedNavigation from '../src/navigation/tabbed-navigation';
import {useAuth} from './context/auth';
import LoginScreen from './screens/auth/login-screen';
import {Text, View} from 'react-native';

function AppRoot(): React.JSX.Element {
  const auth = useAuth();
  return (
    <View style={{flex: 1}}>
      {auth?.loginState ? <TabbedNavigation /> : <LoginScreen />}
    </View>
  );
}

export default AppRoot;
