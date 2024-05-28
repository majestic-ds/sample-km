import axios from 'axios';
import {API} from '../../api';
import {StatusType} from '../../../types/status';

export async function createStatus(data: StatusType) {
  try {
    const work = await axios.post(API('/status'), data);
    return work.data.status;
  } catch (error: unknown) {
    return false;
  }
}

export async function getWorkStatus(id: number): Promise<StatusType[]> {
  try {
    const work = await axios.get(API('/status?work_id=' + id));

    console.log(work.data);

    return work.data.data;
  } catch (error: unknown) {
    console.log(error);

    return [];
  }
}
