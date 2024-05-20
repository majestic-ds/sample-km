import {Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WorkType} from '../../types/work';
import {acknowledgeWork, getUserWorkByWorkId} from '../../utils/data/work';
import {
  Box,
  Button,
  ButtonText,
  Card,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import {CustomAccordian} from '../../components/ui/accordian';
import FloatinActionButton from '../../components/ui/button/floating-action-button';
import {PDFViewer} from '../../components/pdf-viewer';
import {API} from '../../utils/api';
import {ScrollView} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import AddStatus from '../../components/add-status';

interface Props {
  route: {
    params: {
      workId: string | number;
    };
  };
}

export default function WorkDetailPage({route}: any) {
  const ref = React.useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [work, setWork] = useState<WorkType | null>(null);
  const [reload, setReload] = useState(0);
  const [addStatus, setAddStatus] = useState(false);

  const nav = useNavigation();
  const workId = route.params.workId;

  useEffect(() => {
    if (workId) {
      getUserWorkByWorkId(workId)
        .then(data => setWork(data))
        .finally(() => setLoading(false));
    }

    return () => {};
  }, [workId, reload]);

  if (loading || work === null) {
    return (
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Spinner size={'large'} />
      </Box>
    );
  }

  return (
    // @ts-ignore
    <View flex={1}>
      <ScrollView>
        <Card>
          <Text
            textAlign="center"
            fontSize={'$3xl'}
            fontWeight="bold"
            textTransform="capitalize">
            {work?.work_title}
          </Text>

          <Text
            textTransform="capitalize"
            color={
              work?.priority === 'low priority'
                ? '$green600'
                : work?.priority === 'normal priority'
                ? '$blue600'
                : work?.priority === 'high priority'
                ? '$yellow600'
                : work?.priority === 'urgent priority'
                ? '$orange600'
                : '$red600'
            }>
            <Text fontWeight="bold">Priority: </Text>
            {work?.priority}
          </Text>
          <Text
            textTransform="capitalize"
            color={
              work?.sensitivity === 'public'
                ? '$green600'
                : work?.sensitivity === 'internal use only'
                ? '$blue600'
                : work?.sensitivity === 'confidential'
                ? '$yellow600'
                : work?.sensitivity === 'restricted'
                ? '$orange600'
                : '$red600'
            }>
            <Text fontWeight="bold">Sensitivity: </Text>
            {work?.sensitivity}
          </Text>

          <Button
            marginTop={'$2.5'}
            marginBottom={'$2.5'}
            disabled={work?.acknowledged === 'yes'}
            onPress={() => {
              acknowledgeWork(workId).then(() => setReload(reload + 1));
            }}
            backgroundColor={
              work?.acknowledged === 'no' ? '$rose800' : '$green600'
            }>
            <ButtonText>
              {work?.acknowledged === 'no'
                ? 'Acknowledge the work'
                : 'Work acknowledged'}
            </ButtonText>
          </Button>
          <Button>
            <ButtonText
              onPress={() =>
                // @ts-ignore
                nav.navigate('ViewPDFPage', {
                  uri: API('/files/' + work.document_id),
                })
              }
              textAlign="center">
              View Document
            </ButtonText>
          </Button>
          <CustomAccordian
            items={[
              {
                title: 'Work Description',
                description: work?.description,
              },
            ]}
          />
        </Card>
      </ScrollView>

      {addStatus && <AddStatus onClose={() => setAddStatus(() => false)} />}

      <FloatinActionButton onPress={() => setAddStatus(() => true)} />
    </View>
  );
}