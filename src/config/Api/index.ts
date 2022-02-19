import axios from 'axios';

export const baseUrl = 'https://api.tvmaze.com/';
const headers = { 'Content-Type': 'application/json' };

export const tvMazeAxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: headers,
});
