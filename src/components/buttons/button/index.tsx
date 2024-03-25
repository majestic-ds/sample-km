import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../../context/theme/colors';

interface Props {
  onPress: (props: any) => any;
  label?: string;
}

export default function Button({onPress, label}: Props) {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        backgroundColor: Colors.ORANGE,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
      }}
      onPress={onPress}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>
        {label ?? 'PRESS'}
      </Text>
    </TouchableOpacity>
  );
}
