//create a stack navigation

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../../pages/home/home-page';
import WorkDetailPage from '../../pages/home/work-detail-page';
import ViewPDFPage from '../../pages/home/view-pdf-page';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WorkDetailPage"
        component={WorkDetailPage}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ViewPDFPage"
        component={ViewPDFPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
