import {View, Text} from 'react-native';
import React from 'react';
import {getTimeDifference} from './lib/parseTime';
import {Priority} from '../../../configs/enums';

interface Props {
  dateTime: string;
}

type Units =
  | 'year'
  | 'years'
  | 'month'
  | 'months'
  | 'day'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'past';

const color = (value?: number, unit?: Units): Priority => {
  if (value && unit) {
    if (unit === 'days' && value >= 3) {
      return Priority.LOW;
    }

    if (unit === 'days' && value > 0) {
      return Priority.MEDIUM;
    }
  }
  return Priority.HIGH;
};

export default function TimeCard({dateTime}: Props) {
  const timeDiff = getTimeDifference(dateTime);

  const priorityColor = color(timeDiff?.value, timeDiff?.unit);

  return (
    <View
      style={{
        borderColor: priorityColor,
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,

        height: null,
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 30, color: priorityColor}}>
        {timeDiff?.value}
      </Text>
      <Text style={{color: priorityColor}}>{timeDiff?.unit}</Text>
    </View>
  );
}
