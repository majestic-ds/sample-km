import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserType} from '../../../types/user';
import {Users} from '../../../fake-data/users';
import {LocalStorageNames} from '../../../configs/enums';

export interface Props {
  username: string;
  password: string;
}
export async function login({
  password,
  username,
}: Props): Promise<UserType | null> {
  const credentials = Users.find(
    data => data.username === username && data.password === password,
  );

  if (credentials) {
    await AsyncStorage.setItem(
      LocalStorageNames.USER,
      JSON.stringify(credentials),
    );
    return credentials;
  }
  return null;
}
