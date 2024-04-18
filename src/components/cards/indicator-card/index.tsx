import {Text, View} from 'react-native';
import React from 'react';
import {Priority} from '../../../configs/enums';

interface Props {
  option: string;
  priority: Priority;
}

export default function IndicatorCard({option, priority}: Props) {
  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: priority,
          borderRadius: 20,
          marginRight: 5,
        }}
      />
      <Text style={{color: priority}}>{option}</Text>
    </View>
  );
}
