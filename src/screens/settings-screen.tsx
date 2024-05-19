import {ScrollView} from 'react-native';
import React from 'react';
import {useAuth} from '../context/AuthContext';
import {
  Button,
  ButtonText,
  SafeAreaView,
  View,
  Text,
  Card,
  Avatar,
  AvatarFallbackText,
  HStack,
  Box,
} from '@gluestack-ui/themed';
import PasswordResetForm from '../components/reset-password';

const TextInfo = ({title, text}: {title?: string; text?: string}) =>
  text &&
  title && (
    <View>
      <Text textTransform="capitalize">
        <Text fontWeight="bold">{title}:</Text> {text}
      </Text>
    </View>
  );

export default function SettingsScreen() {
  const auth = useAuth();

  const user = auth?.authState?.user;

  return (
    <SafeAreaView style={{padding: 10}}>
      <ScrollView>
        <Card style={{margin: 10, padding: 10}}>
          <HStack>
            <Box flex={0.5}>
              {user?.first_name && user?.last_name && (
                <Avatar
                  bgColor="$amber600"
                  size="md"
                  borderRadius="$full"
                  backgroundColor="$blue400">
                  <Text color="$white">
                    {user.first_name[0].toUpperCase()}
                    {user.last_name[0].toUpperCase()}
                  </Text>
                </Avatar>
              )}
            </Box>
            <Box
              flex={1}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                textAlign="right"
                fontWeight="bold"
                textTransform="uppercase"
                fontSize={'$lg'}>
                {user?.first_name} {user?.last_name}
              </Text>
            </Box>
          </HStack>
        </Card>

        <Card style={{margin: 10, padding: 10}}>
          <TextInfo
            title="Name"
            text={`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}
          />
          <TextInfo title="Username" text={user?.username} />

          <TextInfo title="Email" text={user?.email} />
          <TextInfo title="Designation" text={user?.designation!} />
        </Card>

        <PasswordResetForm />

        <View style={{margin: 5, padding: 5}}>
          <Button
            backgroundColor="red"
            onPress={() => auth?.onLogout && auth?.onLogout()}>
            <ButtonText>Logout </ButtonText>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
