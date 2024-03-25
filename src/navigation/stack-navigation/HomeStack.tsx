import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/home/HomeScreen';

export default function HomeStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" component={HomeScreen} />
    </Stack.Navigator>
  );
}
