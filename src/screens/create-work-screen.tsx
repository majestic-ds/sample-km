import {View, ScrollView, GestureResponderEvent} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';

import {Formik} from 'formik';
import {WorkSchema} from '../validators/work';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {useAuth} from '../context/AuthContext';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import FilePicker from '../components/file-picker';
import {DepartmentType} from '../types/department';
import {getAllDepartment} from '../utils/data/department';
import {UserType} from '../types/user';
import {getUser} from '../utils/data/user';
import {createWork} from '../utils/data/work';
import {useToast} from '@gluestack-ui/themed';

export default function CreateWorkScreen() {
  const auth = useAuth();
  const toast = useToast();
  const [date, setDate] = useState(moment().toDate());
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    getAllDepartment().then(data => setDepartments(() => data));

    return () => {};
  }, []);

  useEffect(() => {
    if (selectedDepartment !== null) {
      getUser(`?department_id=${selectedDepartment}`).then(data =>
        setUsers(() => data),
      );
    }

    return () => {};
  }, [selectedDepartment]);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Formik
          initialValues={{
            from_department: auth.authState?.user?.department_id!,
            work_title: '',
            work_creator: `${auth.authState?.user?.id || ''}`,
            handler_id: '',
            handler_dept: '',

            document_id: '',
            date: date,
            sensitivity: '',
            priority: '',
            acknowledged: 'no',
            keywords: [],
            description: '',
            is_reassignment: 'no',
          }}
          validationSchema={toFormikValidationSchema(WorkSchema)}
          onSubmit={async data => {
            // @ts-ignore
            const response = await createWork(data);
            toast.show({
              placement: 'top',
              render: ({id}: {id: any}) => {
                const toastId = 'toast-' + id;
                return (
                  <Toast
                    nativeID={toastId}
                    action={response ? 'success' : 'error'}
                    variant="solid">
                    <VStack space="xs">
                      <ToastTitle>
                        {response ? 'Work Created' : 'Failed to create work'}
                      </ToastTitle>
                      <ToastDescription>
                        {response
                          ? 'Work has been created successfully'
                          : 'Failed to create work'}
                      </ToastDescription>
                    </VStack>
                  </Toast>
                );
              },
            });
          }}>
          {({
            handleChange,
            setFieldValue,
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
                  setDate(moment(date).toDate());
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <Select
                onValueChange={text => {
                  setFieldValue('keywords', text);
                  setSelectedDepartment(text);
                }}>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Select Department" />
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

                    {departments?.map(
                      (department: DepartmentType, index: number) => (
                        <SelectItem
                          key={index}
                          label={department.name}
                          value={`${department.id!}`}
                        />
                      ),
                    )}
                  </SelectContent>
                </SelectPortal>
              </Select>

              <Select
                onValueChange={text => {
                  handleChange('handler_id')(text.split('$$$-%%%')[0]);
                  handleChange('handler_dept')(text.split('$$$-%%%')[1]);
                }}>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Select Handler" />
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

                    {users?.map(
                      (
                        {
                          id,
                          first_name,
                          last_name,
                          middle_name,
                          department_id,
                        }: UserType,
                        index: number,
                      ) => (
                        <SelectItem
                          key={index}
                          label={
                            first_name + ' ' + middle_name + ' ' + last_name
                          }
                          value={`${id! + '$$$-%%%' + department_id}`}
                        />
                      ),
                    )}
                  </SelectContent>
                </SelectPortal>
              </Select>

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
                  {errors.handler_id ?? 'please select sensitivity'}
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
                  {errors.handler_id ?? 'please select priority'}
                </Text>
              )}

              <Input>
                <InputField
                  type="text"
                  defaultValue=""
                  placeholder="Keywords"
                  // convert this in to a array of strings
                  //before handleChange
                  onChangeText={text => {
                    const keywords = text.split(',');
                    setFieldValue('keywords', keywords);
                  }}
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
              {touched.description && errors.description && (
                <Text fontSize={'$sm'} color="$rose500">
                  {errors.description ?? 'please enter description'}
                </Text>
              )}

              <FilePicker onFileSelect={handleChange('document_id')} />
              {values.document_id && (
                <Input isDisabled>
                  <InputField
                    type="text"
                    defaultValue={values.document_id}
                    placeholder="Document ID"
                    onChangeText={handleChange('document_id')}
                  />
                </Input>
              )}

              <Button
                onPressIn={(event: GestureResponderEvent) =>
                  // @ts-ignore
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
