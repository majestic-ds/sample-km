//create a stack navigation

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../../pages/home/home-page';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomePage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
