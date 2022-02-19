import axios from 'axios';
import { tvMazeAxiosInstance } from 'config/Api';
import { Season, Show } from './types';

export async function getShows(page: number) {
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

export async function getSeasons(id: number) {
  try {
    const response = await tvMazeAxiosInstance.get<Season[]>(
      `shows/${id}/seasons`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
