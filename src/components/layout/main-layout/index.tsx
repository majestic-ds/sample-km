import {ScrollView} from 'react-native';
import React, {ReactNode} from 'react';
import MiniProfileCard from '../../cards/mini-profile-card';
import {Colors} from '../../../context/theme/colors';

export default function MainLayout({children}: {children: ReactNode}) {
  return (
    <ScrollView style={{backgroundColor: Colors.LIGHT_BLUE, flex: 1}}>
      <MiniProfileCard />
      {children}
    </ScrollView>
  );
}
