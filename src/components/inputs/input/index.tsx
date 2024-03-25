import React from 'react';
import {View, TextInput} from 'react-native';
import {Colors} from '../../../context/theme/colors';

interface Props {
  label: string;
  value?: string;
  secureInput?: boolean;
  onTextInput: (text: string) => any;
}

export default function Input({value, label, secureInput, onTextInput}: Props) {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        padding: 20,
        margin: 10,
      }}>
      <TextInput
        style={{height: 50, color: Colors.OLIVE_GREEN}}
        placeholder={label}
        placeholderTextColor={Colors.OLIVE_GREEN}
        secureTextEntry={secureInput}
        value={value}
        onChangeText={text => onTextInput(text)}
      />
    </View>
  );
}
