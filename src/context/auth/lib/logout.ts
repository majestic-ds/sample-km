import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStorageNames} from '../../../configs/enums';


export async function logout(): Promise<void> {

    await AsyncStorage.removeItem(LocalStorageNames.USER);
}
