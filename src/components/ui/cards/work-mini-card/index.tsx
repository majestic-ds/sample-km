import React from 'react';
import {WorkType} from '../../../../types/work';
import {Button, ButtonText, Card, Text} from '@gluestack-ui/themed';

import moment from 'moment';

interface Props extends WorkType {
  indexNumber: number;
}
export default function WorkMiniCard({
  work_title,
  date,
  acknowledged,
  description,
  priority,
  sensitivity,
  indexNumber,
}: Props) {
  return (
    <Card
      style={{
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '2.5%',
        marginTop: '2.5%',
      }}>
      <Text fontWeight="bold" fontSize={'$xl'}>
        {indexNumber + 1}. {work_title}
      </Text>
      <Text fontSize={'$sm'} textAlign="justify">
        {description}
      </Text>
      <Text fontSize={'$sm'} color="$blue600">
        <Text fontWeight="bold">Work Deadline: </Text>
        {moment(date).format('MMMM Do YYYY')}
      </Text>
      <Text color={acknowledged === 'yes' ? '$blue600' : '$rose800'}>
        {acknowledged === 'yes' ? 'Acknowledged' : 'Acknowledgement Required'}
      </Text>

      <Text
        color={
          priority === 'low priority'
            ? '$green600'
            : priority === 'normal priority'
            ? '$blue600'
            : priority === 'high priority'
            ? '$yellow600'
            : priority === 'urgent priority'
            ? '$orange600'
            : '$red600'
        }>
        <Text fontWeight="bold">Priority: </Text>
        {priority}
      </Text>
      <Text
        color={
          sensitivity === 'public'
            ? '$green600'
            : sensitivity === 'internal use only'
            ? '$blue600'
            : sensitivity === 'confidential'
            ? '$yellow600'
            : sensitivity === 'restricted'
            ? '$orange600'
            : '$red600'
        }>
        <Text fontWeight="bold">Sensitivity: </Text>
        {sensitivity}
      </Text>

      {acknowledged === 'no' && (
        <Button marginTop={'$5'}>
          <ButtonText>View Work </ButtonText>
        </Button>
      )}
    </Card>
  );
}
