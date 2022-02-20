import { Show } from 'services/TvMazeService/types';

export type StorageKeysTypes = {
  '@favorites': Show[];
  '@pin': string;
  '@useFigerprint': boolean;
};

export type StorageKeys = keyof StorageKeysTypes;
