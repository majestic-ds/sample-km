import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Colors} from '../../../context/theme/colors';
import Input from '../../../components/inputs/input';
import Button from '../../../components/buttons/button';
import {useAuth} from '../../../context/auth';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  const handleLogin = async () => {
    await auth?.login({
      username,
      password,
    });

    // Implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // You can replace the console.log with your actual login logic
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.OLIVE_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Dimensions.get('screen').width / 20,
      }}>
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        source={require('../../../../assets/images/logo.png')}
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 50,
          color: Colors.WHITE,
          marginBottom: 40,
        }}>
        بلدية الكويت
      </Text>
      <Input label="Username" onTextInput={text => setUsername(text)} />

      <Input
        label="Password"
        secureInput={true}
        onTextInput={text => setPassword(text)}
      />

      <Button label="LOGIN" onPress={handleLogin} />
    </View>
  );
}
