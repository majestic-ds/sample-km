import React, {useEffect, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {RefreshControl, View} from 'react-native';
import {Button, ButtonText, ScrollView} from '@gluestack-ui/themed';
import {WorkType} from '../../types/work';
import {getUserWork} from '../../utils/data/work';
import WorkMiniCard from '../../components/ui/cards/work-mini-card';

export default function HomePage() {
  const auth = useAuth();
  const [works, setWorks] = useState<WorkType[]>([]);

  const [refreshing, setRefreshing] = React.useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (auth?.authState?.user?.id) {
      getUserWork(auth.authState.user.id).then(data => setWorks(data));
      setRefreshing(false);
    }
    return () => {};
  }, [auth?.authState?.user, reload]);

  return (
    <ScrollView
      flex={1}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setReload(reload + 1);
          }}
        />
      }>
      {works.map((work, index) => (
        <WorkMiniCard key={index} {...work} indexNumber={index} />
      ))}
    </ScrollView>
  );
}
