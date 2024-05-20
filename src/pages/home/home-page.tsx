import React, {useEffect, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {RefreshControl, View} from 'react-native';
import {
  Button,
  ButtonText,
  FlatList,
  ScrollView,
  Spinner,
} from '@gluestack-ui/themed';
import {WorkType} from '../../types/work';
import {getUserWork} from '../../utils/data/work';
import WorkMiniCard from '../../components/ui/cards/work-mini-card';
import {Box} from '@gluestack-ui/themed';
import TotalResults from '../../components/ui/cards/result-number';

export default function HomePage() {
  const auth = useAuth();
  const [works, setWorks] = useState<WorkType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (auth?.authState?.user?.id) {
      getUserWork(auth.authState.user.id)
        .then(data => setWorks(data))
        .finally(() => setLoading(false));
      setRefreshing(false);
    }
    return () => {};
  }, [auth?.authState?.user, reload]);

  if (loading) {
    return (
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Spinner size={'large'} />
      </Box>
    );
  }

  return (
    // @ts-ignore
    <View flex={1}>
      <TotalResults totalResults={works?.length} />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setReload(reload + 1);
            }}
          />
        }
        data={works}
        // @ts-ignore
        renderItem={({item, index}: {item: WorkType; index: number}) => (
          <WorkMiniCard key={index} {...item} indexNumber={index} />
        )}
      />
    </View>
  );
}
