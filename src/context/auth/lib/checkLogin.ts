import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserType} from '../../../types/user';
import {LocalStorageNames} from '../../../configs/enums';

export async function checkLogin(): Promise<UserType | null> {
  const userData = await AsyncStorage.getItem(LocalStorageNames.USER);

  if (userData) {
    try {
      const data = JSON.parse(userData);
      return data;
    } catch (error: unknown) {
      return null;
    }
  }
  return null;
}
