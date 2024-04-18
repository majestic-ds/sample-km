import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import OutBoundScreen from '../../screens/outbound/OutBoundScreen';

export default function OutBoundStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" component={OutBoundScreen} />
    </Stack.Navigator>
  );
}
