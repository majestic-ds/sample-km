import {View, ScrollView, GestureResponderEvent} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  Text,
  Select,
  ChevronDownIcon,
  Icon,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';

import {Formik, ErrorMessage} from 'formik';
import {WorkSchema} from '../validators/work';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {useAuth} from '../context/AuthContext';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {generateDocumentId} from '../utils/generate-document-id';

export default function CreateWorkScreen() {
  const auth = useAuth();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const documentId = generateDocumentId();

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Formik
          initialValues={{
            work_title: '',
            handler_id: `${auth.authState?.user?.id || ''}`,
            document_id: documentId,
            date: date,
            sensitivity: '',
            priority: '',
            acknowledged: 'no',
            keywords: [],
            description: '',
          }}
          validationSchema={toFormikValidationSchema(WorkSchema)}
          onSubmit={data => console.log(data)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Box gap={'$2'} padding={'$5'}>
              <Input>
                <InputField
                  type="text"
                  defaultValue=""
                  placeholder="Work Title"
                  onChangeText={handleChange('work_title')}
                />
              </Input>
              {touched.work_title && errors.work_title && (
                <Text fontSize={'$sm'} color="$rose500">
                  {errors.handler_id ?? 'please enter work title'}
                </Text>
              )}

              <Input isDisabled>
                <InputField
                  type="text"
                  defaultValue={values.handler_id}
                  placeholder="Handler ID"
                  onChangeText={handleChange('handler_id')}
                />
              </Input>
              {touched.handler_id && errors.handler_id && (
                <Text fontSize={'$sm'} color="$rose500">
                  {errors.handler_id ?? 'please login to create work'}
                </Text>
              )}

              <Input isDisabled>
                <InputField
                  type="text"
                  defaultValue={values.document_id}
                  placeholder="Document ID"
                  onChangeText={handleChange('document_id')}
                />
              </Input>
              {touched.document_id && errors.document_id && (
                <Text fontSize={'$sm'} color="$rose500">
                  {errors.handler_id ?? 'bo'}
                </Text>
              )}

              <Button onPressIn={() => setOpen(true)}>
                <ButtonText>
                  Date: {moment(date).format('DD-MM-YYYY hh:mm a')}
                </ButtonText>
              </Button>

              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <Select onValueChange={handleChange('sensitivity')}>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Select Work Sensitivity" />
                  {/* @ts-ignore */}
                  <SelectIcon mr="$3">
                    <Icon as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>

                    <SelectItem label="Public" value="public" />
                    <SelectItem
                      label="Internal Use Only"
                      value="internal use only"
                    />
                    <SelectItem label="Confidential" value="confidential" />
                    <SelectItem label="Restricted" value="restricted" />
                    <SelectItem label="Top Secret" value="top secret" />
                  </SelectContent>
                </SelectPortal>
              </Select>

              {touched.sensitivity && errors.sensitivity && (
                <Text fontSize={'$sm'} color="$rose500">
                  {errors.handler_id ?? 'bo'}
                </Text>
              )}

              <Select onValueChange={handleChange('priority')}>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Select Work Priority" />
                  {/* @ts-ignore */}
                  <SelectIcon mr="$3">
                    <Icon as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>

                    {/* priority: z.enum(["low priority", "normal priority", "high priority", "urgent priority", "critical priority"]) */}

                    <SelectItem label="low Priority" value="low priority" />
                    <SelectItem
                      label="normal Priority"
                      value="normal priority"
                    />
                    <SelectItem label="high Priority" value="high priority" />
                    <SelectItem
                      label="urgent Priority"
                      value="urgent priority"
                    />
                    <SelectItem
                      label="critical Priority"
                      value="critical priority"
                    />
                  </SelectContent>
                </SelectPortal>
              </Select>

              {touched.priority && errors.priority && (
                <Text fontSize={'$sm'} color="$rose500">
                  {errors.handler_id ?? 'bo'}
                </Text>
              )}

              <Input>
                <InputField
                  type="text"
                  defaultValue=""
                  placeholder="Keywords"
                  onChangeText={handleChange('keywords')}
                />
              </Input>
              {touched.keywords && errors.keywords && (
                <Text fontSize={'$sm'} color="$rose500">
                  {errors.handler_id ?? 'please enter keywords'}
                </Text>
              )}

              <Textarea>
                <TextareaInput
                  defaultValue=""
                  placeholder="Description"
                  onChangeText={handleChange('description')}
                />
              </Textarea>

              <Button
                onPressIn={(event: GestureResponderEvent) =>
                  handleSubmit(event)
                }>
                <ButtonText>Create New Work</ButtonText>
              </Button>
            </Box>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
