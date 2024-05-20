import axios from 'axios';
import {API} from '../../api';
import {UserType} from '../../../types/user';

export async function getUser(query?: string): Promise<UserType[]> {
  try {
    const department = await axios.get(API(`/user${query ? `${query}` : ''}`));

    return department.data.data;
  } catch (error: unknown) {
    return [];
  }
}

interface PasswordResetProps {
  id: number;
  new_password: string;
  old_password: string;
}

export async function resetPassword(
  data: PasswordResetProps,
): Promise<boolean> {
  try {
    const request = await axios.post(API('/user/reset-password'), data);
    return !!request.data.status;
  } catch (error: unknown) {
    return false;
  }
}
