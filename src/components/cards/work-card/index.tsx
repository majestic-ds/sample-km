import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../../context/theme/colors';
import TimeCard from '../time-card';
import IndicatorCard from '../indicator-card';
import {Priority} from '../../../configs/enums';
import moment from 'moment';

interface Props {
  priority: {
    level: Priority;
    text: string;
  };
  sensitivity: {
    level: Priority;
    text: string;
  };
  deadline: string;
}

export default function WorkCard({priority, deadline, sensitivity}: Props) {
  const date = deadline;
  return (
    <View
      style={{
        elevation: 2,
        margin: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}>
      <View
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, padding: 5}}>
          <Text style={{color: Colors.BLACK, fontSize: 20}}>Work Title</Text>
          <Text style={{color: Colors.BLACK, fontSize: 12}}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad fugiat,
            nulla accusantium...
          </Text>
        </View>
        <View>
          <TimeCard dateTime={date} />
        </View>
      </View>
      <View
        style={{
          padding: 10,
          paddingTop: 0,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, padding: 5, flexDirection: 'row'}}>
          <IndicatorCard option={priority.text} priority={priority.level} />
          <IndicatorCard
            option={sensitivity.text}
            priority={sensitivity.level}
          />
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right', color: '#000'}}>
              {moment(date).format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
