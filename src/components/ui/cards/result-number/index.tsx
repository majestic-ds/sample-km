// TotalResults.js
import React from 'react';
import {View, Text} from '@gluestack-ui/themed';

const TotalResults = ({totalResults}: {totalResults: number}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginLeft: 20,
      }}>
      <Text style={{width: '100%'}}>Total Results: {totalResults}</Text>
    </View>
  );
};

export default TotalResults;
