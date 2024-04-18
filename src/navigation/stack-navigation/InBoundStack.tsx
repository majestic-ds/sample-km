import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import InBoundScreen from '../../screens/inbound/InBoundScreen';

export default function HomeStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" component={InBoundScreen} />
    </Stack.Navigator>
  );
}
