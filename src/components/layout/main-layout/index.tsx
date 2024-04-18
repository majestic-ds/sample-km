import {View} from 'react-native';
import React, {ReactNode} from 'react';
import MiniProfileCard from '../../cards/mini-profile-card';
import {Colors} from '../../../context/theme/colors';

export default function MainLayout({children}: {children: ReactNode}) {
  return (
    <View style={{backgroundColor: Colors.LIGHT_BLUE, flex: 1}}>
      <MiniProfileCard />
      {children}
    </View>
  );
}
