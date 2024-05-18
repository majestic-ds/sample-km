import {View, Text} from 'react-native';
import React from 'react';
import {useAuth} from '../context/AuthContext';
import {Button, ButtonText} from '@gluestack-ui/themed';

export default function HomeScreen() {
  const auth = useAuth();

  console.log('authState', auth.authState);

  return (
    <View>
      <Text>HomeScreen </Text>
      <Button onPress={() => auth?.onLogout && auth?.onLogout()}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  );
}
