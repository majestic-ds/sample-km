import {ScrollView} from 'react-native';
import React from 'react';
import {useAuth} from '../context/AuthContext';
import {Button, ButtonText, SafeAreaView} from '@gluestack-ui/themed';

export default function SettingsScreen() {
  const auth = useAuth();

  console.log('authState', auth.authState);

  return (
    <SafeAreaView style={{padding: 10}}>
      <ScrollView>
        <Button
          backgroundColor="red"
          onPress={() => auth?.onLogout && auth?.onLogout()}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
