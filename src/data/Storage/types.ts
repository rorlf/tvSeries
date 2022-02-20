import { Show } from 'services/TvMazeService/types';

export type StorageKeysTypes = {
  '@favorites': Show[];
  '@pin': string;
  '@useFigerprint': boolean;
  '@darkMode': boolean;
};

export type StorageKeys = keyof StorageKeysTypes;
