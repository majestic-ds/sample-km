import { Dimensions, View } from 'react-native';
import React, { ReactNode } from 'react';
import MiniProfileCard from '../../cards/mini-profile-card';


export default function MainLayout({children}:{children: ReactNode}) {
  return (
    <View style={{ height: Dimensions.get('screen').height}}>
        <MiniProfileCard />
      {children}
    </View>
  );
}
