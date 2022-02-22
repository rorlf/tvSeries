import axios from 'axios';
import { tvMazeAxiosInstance } from 'config/Api';
import {
  Episode,
  PersonCastCredits,
  PersonCrewCredits,
  SearchedPerson,
  SearchedShow,
  Season,
  Show,
} from './types';

export async function getShows(page: number) {
  const endpoint = `shows?page=${page}`;

  try {
    const response = await tvMazeAxiosInstance.get<Show[]>(endpoint);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) return undefined;
    }
    throw error;
  }
}

export async function getSeasons(id: number) {
  const endpoint = `shows/${id}/seasons`;

  try {
    const response = await tvMazeAxiosInstance.get<Season[]>(endpoint);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getSeasonEpisodes(id: number) {
  const endpoint = `seasons/${id}/episodes`;

  try {
    const response = await tvMazeAxiosInstance.get<Episode[]>(endpoint);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function searchShows(searchString: string) {
  const endpoint = `search/shows?q=${searchString}`;

  try {
    const response = await tvMazeAxiosInstance.get<SearchedShow[]>(endpoint);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getShowEpisodes(id: number) {
  const endpoint = `shows/${id}/episodes`;

  try {
    const response = await tvMazeAxiosInstance.get<Episode[]>(endpoint);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function searchPeople(searchString: string) {
  const endpoint = `search/people?q=${searchString}`;

  try {
    const response = await tvMazeAxiosInstance.get<SearchedPerson[]>(endpoint);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPersonCastCredits(id: number) {
  const endpoint = `people/${id}/castcredits?embed=show`;

  try {
    const response = await tvMazeAxiosInstance.get<PersonCastCredits[]>(
      endpoint,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPersonCrewCredits(id: number) {
  const endpoint = `people/${id}/crewcredits?embed=show`;

  try {
    const response = await tvMazeAxiosInstance.get<PersonCrewCredits[]>(
      endpoint,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
