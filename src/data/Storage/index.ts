import { useCallback, useMemo } from 'react';
import { MMKV, useMMKVString } from 'react-native-mmkv';
import { StorageKeys, StorageKeysTypes } from './types';

const storage = new MMKV();
const secureStorage = new MMKV({
  id: 'mmkv.default',
  encryptionKey: 'tvSeries2022',
});

function convertItemToData(item) {
  const data = JSON.parse(item);
  return data;
}

function convertDataToItem(data) {
  const item = JSON.stringify(data);
  return item;
}

function storeData<T extends StorageKeys>(key: T, data: StorageKeysTypes[T]) {
  const item = convertDataToItem(data);
  storage.set(key, item);
}

function getData<T extends StorageKeys>(
  key: T,
): StorageKeysTypes[T] | undefined {
  const item = storage.getString(key);
  if (item) {
    const data = convertItemToData(item);
    return data;
  }
  return undefined;
}

function storeSensitiveData<T extends StorageKeys>(
  key: T,
  data: StorageKeysTypes[T],
) {
  const item = convertDataToItem(data);
  secureStorage.set(key, item);
}

function getSensitiveData<T extends StorageKeys>(
  key: T,
): StorageKeysTypes[T] | undefined {
  const item = secureStorage.getString(key);
  if (item) {
    const data = convertItemToData(item);
    return data;
  }
  return undefined;
}

function removeData(key: StorageKeys) {
  storage.delete(key);
}

export function useStorageValue<T extends StorageKeys>(
  key: T,
): [
  StorageKeysTypes[T] | undefined,
  (data: StorageKeysTypes[T] | undefined) => void,
] {
  const [value, setValue] = useMMKVString(key);

  const data: StorageKeysTypes[T] | undefined = useMemo(
    () => (value ? convertItemToData(value) : undefined),
    [value],
  );

  const setItemValue = useCallback(
    (data: StorageKeysTypes[T] | undefined) => {
      const item = convertDataToItem(data);
      setValue(item);
    },
    [setValue],
  );

  return [data, setItemValue];
}

export default {
  storeData,
  getData,
  removeData,
  storeSensitiveData,
  getSensitiveData,
};
