import axios from 'axios';
import { tvMazeAxiosInstance } from 'config/Api';
import { Show } from './types';

export async function getShows(page) {
  try {
    const response = await tvMazeAxiosInstance.get<Show[]>(
      `shows?page=${page}`,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) return undefined;
    }
    throw error;
  }
}
