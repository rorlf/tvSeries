import { Show } from 'services/TvMazeService/types';

export type StorageKeysTypes = {
  '@favorites': Show[];
};

export type StorageKeys = keyof StorageKeysTypes;
