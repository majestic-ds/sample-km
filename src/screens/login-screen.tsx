import {
  View,
  AlertCircleIcon,
  Box,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Image,
  Button,
  ButtonText,
  Text,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {useAuth} from '../context/AuthContext';
import {Pressable} from 'react-native';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();

  const [credentials, setCredentials] = useState({
    email: 'noeljose1998af@gmail.com',
    password: 'Mirage20#@',
  });

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Box w="$72">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image
            size="lg"
            $xs-borderRadius="$none"
            source={require('../../assets/images/logo.png')}
            margin={'auto'}
            alt="kuwait municipal logo"
          />
          <Text fontSize={'$4xl'}>بلدية الكويت</Text>
        </Box>

        <>
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}
            mb="$5">
            <FormControlLabel mb="$1">
              <FormControlLabelText>Enter Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                defaultValue=""
                placeholder="Email"
                onChangeText={value =>
                  setCredentials(val => ({...val, email: value}))
                }
              />
            </Input>
          </FormControl>
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}
            mb="$5">
            <FormControlLabel mb="$1">
              <FormControlLabelText>Enter Password</FormControlLabelText>
            </FormControlLabel>
            <Input display="flex" justifyContent="center" alignItems="center">
              <InputField
                type={showPassword ? 'text' : 'password'}
                defaultValue=""
                placeholder="password"
                showSoftInputOnFocus={true}
                onChangeText={value =>
                  setCredentials(val => ({...val, password: value}))
                }
              />
            </Input>

            <View>
              <Pressable onPress={() => setShowPassword(val => !val)}>
                <Text>{showPassword ? 'Hide' : 'Show'} Password</Text>
              </Pressable>
            </View>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                At least 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}>
            <Button
              onPress={() =>
                auth.onLogin &&
                auth.onLogin(credentials.email, credentials.password)
              }>
              <ButtonText>Login</ButtonText>
            </Button>
          </FormControl>
        </>
      </Box>
    </View>
  );
}
