import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../../screens/login-screen';
import {useAuth} from '../../context/AuthContext';
import SettingsScreen from '../../screens/settings-screen';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CreateWorkScreen from '../../screens/create-work-screen';
import {Dimensions} from 'react-native';
import ChatScreen from '../../screens/chat-screent';
import HomeStack from '../stack/HomeStack';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

const IconStyle = ({
  focused,
  iconName,
  size,
}: {
  focused: boolean;
  iconName?: string;
  size: number;
}) => (
  <Icon
    name={iconName!}
    size={size}
    color={!focused ? '#ffffff' : '#246EE9'}
    style={{
      backgroundColor: focused ? '#ffffff' : '#246EE9',
      padding: 3,
      borderRadius: 5,
    }}
  />
);

const WorksIcon = ({focused, size}: {focused: boolean; size: number}) => (
  <IconStyle focused={focused} iconName="briefcase" size={size} />
);

const SettingsIcon = ({focused, size}: {focused: boolean; size: number}) => (
  <IconStyle focused={focused} iconName="cog" size={size} />
);

const CreateWorkIcon = ({focused, size}: {focused: boolean; size: number}) => (
  <IconStyle focused={focused} iconName="folder-plus" size={size} />
);

const CreateChatIcon = ({focused, size}: {focused: boolean; size: number}) => (
  <IconStyle focused={focused} iconName="comment" size={size} />
);
export default function TabbedNavigation() {
  const auth = useAuth();

  if (!auth.authState?.authenticated) {
    return <LoginScreen />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#246EE9',
          },
          tabBarIconStyle: {
            width: '100%',
            height: '100%',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: WorksIcon,
          }}
        />
        <Tab.Screen
          name="Create Work"
          component={CreateWorkScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: CreateWorkIcon,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: CreateChatIcon,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: SettingsIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
