import axios from 'axios';
import {DepartmentType} from '../../../types/department';
import {API} from '../../api';

export async function getAllDepartment(): Promise<DepartmentType[]> {
  try {
    const department = await axios.get(API('/department'));

    return department.data.data;
  } catch (error: unknown) {
    return [];
  }
}
