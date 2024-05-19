// PasswordResetForm.js
import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Input,
  Button,
  Card,
  Text,
  ButtonSpinner,
  useToast,
  ToastDescription,
} from '@gluestack-ui/themed';
import {InputField} from '@gluestack-ui/themed';

import {useFormik} from 'formik';
import {useAuth} from '../../context/AuthContext';
import {z} from 'zod';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {resetPassword} from '../../utils/data/user';
import {Toast} from '@gluestack-ui/themed';
import {VStack} from '@gluestack-ui/themed';
import {ToastTitle} from '@gluestack-ui/themed';

const passwordUpdateSchema = z.object({
  id: z.number(),
  old_password: z.string().min(1, 'invalid password'),
  new_password: z.string().min(1, 'invalid password'),
});

type PasswordResetProps = z.infer<typeof passwordUpdateSchema>;

const PasswordResetForm = () => {
  const onSubmit = async (data: PasswordResetProps, reset: any) => {
    setLoading(() => true);
    try {
      const response = await resetPassword(data);

      if (response) reset();

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
                <ToastTitle>{response ? `Success` : `Error`}</ToastTitle>
                <ToastDescription>
                  {response
                    ? `Password reset successful`
                    : `Password reset failed`}
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });

      setLoading(() => false);
    } catch (error) {
      console.log(error);

      setLoading(() => false);
    }
  };
  const auth = useAuth();
  const [id] = useState<any>(auth.authState?.user?.id);
  const toast = useToast();
  const {handleSubmit, handleChange, values, errors, resetForm} = useFormik({
    initialValues: {new_password: '', old_password: '', id},
    validationSchema: toFormikValidationSchema(passwordUpdateSchema),
    // @ts-ignore
    onSubmit: (data: any) => onSubmit(data, resetForm),
  });

  const [loading, setLoading] = useState(false);

  return (
    <Card style={{margin: 10, padding: 10}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
        Password Reset
      </Text>
      <Text style={{marginBottom: 20}}>
        Please enter your old password to reset to new one.
      </Text>

      <View>
        <Input
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}>
          <InputField
            type="text"
            defaultValue=""
            placeholder="Enter Your Old Password"
            value={values.old_password}
            onChangeText={handleChange('old_password')}
          />
        </Input>
        <Input
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}>
          <InputField
            type="text"
            defaultValue=""
            placeholder="Enter Your New Password"
            value={values.new_password}
            onChangeText={handleChange('new_password')}
          />
        </Input>
        <Button
          // @ts-ignore
          onPressIn={handleSubmit}
          style={{padding: 10}}>
          <Text style={{color: 'white'}}>
            {loading ? <ButtonSpinner /> : 'Reset Password'}
          </Text>
        </Button>
      </View>
    </Card>
  );
};

export default PasswordResetForm;
