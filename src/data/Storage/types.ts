import { Show } from 'services/TvMazeService/types';

export type StorageKeysTypes = {
  '@favorites': Show[];
  '@pin': string;
};

export type StorageKeys = keyof StorageKeysTypes;
