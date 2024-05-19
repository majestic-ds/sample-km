import axios from 'axios';
import {WorkType} from '../../../types/work';
import {API} from '../../api';

export async function createWork(data: WorkType): Promise<boolean> {
  try {
    const work = await axios.post(API('/work'), data);

    console.log(work.statusText);

    return work.data.status;
  } catch (error: unknown) {
    return false;
  }
}

export async function getUserWork(id: number): Promise<WorkType[]> {
  try {
    const work = await axios.get(API('/work?hander_id=' + id));

    return work.data.data;
  } catch (error: unknown) {
    return [];
  }
}
