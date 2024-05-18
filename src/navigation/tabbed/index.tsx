import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/home-screen';
import LoginScreen from '../../screens/login-screen';
import {useAuth} from '../../context/AuthContext';
import SettingsScreen from '../../screens/settings-screen';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CreateWorkScreen from '../../screens/create-work-screen';

const Tab = createBottomTabNavigator();

const IconStyle = ({
  focused,
  iconName,
}: {
  focused: boolean;
  iconName?: string;
}) => (
  <Icon
    name={iconName!}
    size={30}
    color={!focused ? '#ffffff' : '#246EE9'}
    style={{
      backgroundColor: focused ? '#ffffff' : '#246EE9',
      padding: 3,
      borderRadius: 5,
    }}
  />
);

const WorksIcon = ({focused}: {focused: boolean}) => (
  <IconStyle focused={focused} iconName="briefcase" />
);

const SettingsIcon = ({focused}: {focused: boolean}) => (
  <IconStyle focused={focused} iconName="user-cog" />
);

const CreateWorkIcon = ({focused}: {focused: boolean}) => (
  <IconStyle focused={focused} iconName="folder-plus" />
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
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
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
