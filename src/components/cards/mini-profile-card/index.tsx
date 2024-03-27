import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {Colors} from '../../../context/theme/colors';
import {useAuth} from '../../../context/auth';

export default function MiniProfileCard() {
  const auth = useAuth();

  const user = auth?.user;

  return (
    <View
      style={{
        backgroundColor: Colors.DARK_GRAY,
        display: 'flex',
        flexDirection: 'row',
      }}>
      <View
        style={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={require('../../../../assets/images/placeholder_image.png')}
        />
      </View>
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 10,
        }}>
        <Text style={{color: Colors.WHITE, fontSize: 30}}>
          {user?.first_name} {user?.middle_name} {user?.last_name}
        </Text>
        <Text
          style={{color: Colors.WHITE, textAlign: 'right', fontWeight: 'bold'}}>
          EMP: {user?.id}{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              auth?.logout();
              auth?.taskComplete(val => val + 1);
            }}
            style={{
              backgroundColor: Colors.RED,
              marginTop: 10,
              borderRadius: 5,
              padding: 5,
              width: '50%',
            }}>
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              LOG OUT{' '}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
