import axios from 'axios';
import {WorkType} from '../../../types/work';
import {API} from '../../api';

export async function createWork(data: WorkType): Promise<boolean> {
  try {
    const work = await axios.post(API('/work'), data);

    return work.data.status;
  } catch (error: unknown) {
    return false;
  }
}

export async function getUserWork(id: number): Promise<WorkType[]> {
  try {
    const work = await axios.get(API('/work?hander_id=' + id));

    console.log(work.data);

    return work.data.data;
  } catch (error: unknown) {
    console.log(error);

    return [];
  }
}

export async function getUserWorkByWorkId(
  id: number,
): Promise<WorkType | null> {
  try {
    const work = await axios.get(API('/work/' + id));

    return work.data.data;
  } catch (error: unknown) {
    return null;
  }
}

export async function acknowledgeWork(id: number): Promise<boolean> {
  try {
    const work = await axios.put(API('/work/' + id), {acknowledged: 'yes'});

    return work.data.status;
  } catch (error: unknown) {
    return false;
  }
}
