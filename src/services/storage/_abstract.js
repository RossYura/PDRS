import { AsyncStorage } from 'react-native';

export default class StorageService {

  static STORAGE_KEY_ROOT = 'PD';

  constructor (STORAGE_KEY_SUFFIX, objectMode = true) {
    this.SERVICE_STORAGE_KEY = StorageService.STORAGE_KEY_ROOT + '_' +
      STORAGE_KEY_SUFFIX;
    this.objectMode = objectMode;
  }

  get = async () => {
    const data = await AsyncStorage.getItem(this.SERVICE_STORAGE_KEY);

    return data
      ? (this.objectMode ? JSON.parse(data) : data)
      : {};
  };

  set (data) {
    return AsyncStorage.setItem(
      this.SERVICE_STORAGE_KEY,
      this.objectMode
        ? JSON.stringify(data)
        : data,
    );
  }

  async put (dataPartial) {
    if (!this.objectMode) {
      throw Error('cannot use \'put\' method without object mode');
    }

    const oldData = await this.get();

    await AsyncStorage.setItem(
      this.SERVICE_STORAGE_KEY,
      JSON.stringify({
        ...oldData,
        ...dataPartial,
      }),
    );
  }

  remove = () => AsyncStorage.removeItem(this.SERVICE_STORAGE_KEY);
}