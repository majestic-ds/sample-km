import React, {useState} from 'react';
import {
  Text,
  Button,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  Icon,
  CloseIcon,
  ModalBody,
  ModalFooter,
  ButtonText,
  View,
  Input,
  Textarea,
  useToast,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {statusSchema} from '../../validators/status';
import {useFormik} from 'formik';
import {StatusType} from '../../types/status';
import {InputField} from '@gluestack-ui/themed';
import {TextareaInput} from '@gluestack-ui/themed';
import FilePicker from '../file-picker';
import {createStatus} from '../../utils/data/status';

interface Props {
  onClose: () => void;
  workId: string;
  handler_id: string;
}

export default function AddStatus({onClose, handler_id, workId}: Props) {
  const ref = React.useRef(null);
  const toast = useToast();

  const [prop] = useState({handler_id, workId});

  const {handleChange, handleSubmit, values, errors, touched, resetForm} =
    useFormik({
      initialValues: {
        attachments: '',
        work_id: `${prop.workId}`,
        handler_id: prop.handler_id,
        status_name: '',
        status_description: '',
      },
      validationSchema: toFormikValidationSchema(statusSchema),
      onSubmit: async (data: StatusType) => {
        const response = await createStatus(data);

        toast.show({
          placement: 'top',
          render: ({id}) => {
            if (response) {
              resetForm();
            }
            const toastId = 'toast-' + id;
            return (
              <Toast
                nativeID={toastId}
                action={response ? 'error' : 'success'}
                variant="outline">
                <VStack space="xs">
                  <ToastTitle>{response ? 'Success' : 'Failed'}</ToastTitle>
                  <ToastDescription>
                    {response ? 'Status Created' : 'Failed to create status'}
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      },
    });
  return (
    <Modal isOpen={true} finalFocusRef={ref}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Add Status</Heading>
          <ModalCloseButton onPress={() => onClose()}>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <View>
            <View marginBottom={'$2'}>
              <Input>
                <InputField
                  type="text"
                  defaultValue=""
                  placeholder="Enter Status Title"
                  onChangeText={handleChange('status_name')}
                />
              </Input>
              {touched.status_name && errors.status_name && (
                <Text fontSize={'$sm'} color="$rose500">
                  {errors.status_name ?? 'please enter status'}
                </Text>
              )}
            </View>

            <Textarea>
              <TextareaInput
                defaultValue=""
                placeholder="Description"
                onChangeText={handleChange('status_description')}
              />
            </Textarea>
            {touched.status_description && errors.status_description && (
              <Text fontSize={'$sm'} color="$rose500">
                {errors.status_description ?? 'please enter description'}
              </Text>
            )}

            <View marginTop={'$2'} marginBottom={'$2'}>
              <FilePicker
                buttonText="Select Attachment"
                onFileSelect={handleChange('attachments')}
              />
              {values.attachments && (
                <Input isDisabled>
                  <InputField
                    type="text"
                    defaultValue={values.attachments}
                    placeholder="Attachment"
                    onChangeText={handleChange('attachments')}
                  />
                </Input>
              )}
            </View>
          </View>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => onClose()}
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3">
            <ButtonText>Close</ButtonText>
          </Button>
          <Button
            //@ts-ignore
            onPress={handleSubmit}
            size="sm"
            action="primary"
            borderWidth="$0">
            <ButtonText>Update Status</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
