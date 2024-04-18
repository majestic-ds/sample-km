import {View} from 'react-native';
import React from 'react';
import Button from '../../../components/buttons/button';
import {Colors} from '../../../context/theme/colors';
import {useAuth} from '../../../context/auth';
import UserInfoCard from './components/user-info-card';
import MainLayout from '../../../components/layout/main-layout';

export default function SettingsScreen() {
  const auth = useAuth();

  return (
    <MainLayout>
      <View style={{margin: 16}}>
        {auth?.user && <UserInfoCard user={auth?.user} />}
      </View>

      <View style={{flex: 1, margin: 16}}>
        <Button
          onPress={() => {
            auth?.logout();
            auth?.taskComplete();
          }}
          backgroundColor={Colors.RED}
          label="LOGOUT"
        />
      </View>
    </MainLayout>
  );
}
