import {View, Text, StyleSheet} from 'react-native';
import {Button, ButtonText, Card, Heading} from '@gluestack-ui/themed';
import React from 'react';
import {StatusType} from '../../../../types/status';
import {API} from '../../../../utils/api';
import {useNavigation} from '@react-navigation/native';

export default function StatusCard(status: StatusType) {
  const nav = useNavigation();
  return (
    <Card style={styles.card}>
      <Heading mb="$1" size="md">
        {`Status: ${status.status_name}`}
      </Heading>
      <View>
        <View style={styles.item}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{status.status_description}</Text>
        </View>
        <View style={styles.item}>
          {status.attachments && (
            <Button
              style={{width: '100%'}}
              onPress={() =>
                // @ts-ignore
                nav.navigate('ViewPDFPage', {
                  uri: API('/files/' + status.attachments),
                })
              }>
              <ButtonText>View Attachment</ButtonText>
            </Button>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
});
