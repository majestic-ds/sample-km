import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SettingsScreen from '../../screens/settings/SettingsScreen';

export default function SettingsStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
