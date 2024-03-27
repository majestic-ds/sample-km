import { Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../../context/theme/colors';

interface Props {
  onPress: (props: any) => any;
  label?: string;
  backgroundColor?: Colors,
  textColor?: Colors
}

export default function Button({onPress, label, backgroundColor = Colors.ORANGE, textColor = Colors.WHITE}: Props) {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        backgroundColor: backgroundColor,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
      }}
      onPress={onPress}>
      <Text style={{color: textColor, fontWeight: 'bold'}}>
        {label ?? 'PRESS'}
      </Text>
    </TouchableOpacity>
  );
}
