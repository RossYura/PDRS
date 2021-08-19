import { AsyncStorage } from 'react-native';

export default {
  get: async (key) => {    
    const item = await AsyncStorage.getItem(key);
    return JSON.parse(item);
  },

  set: async (key, item) => {
    const oldItem = await AsyncStorage.getItem(key);
    if ((item < oldItem) && (key === 'signUpStep')) {
      return;
    }

    await AsyncStorage.setItem(
      key,
      JSON.stringify(item),
    );  
  },

  remove: async (key) => {
    return await AsyncStorage.removeItem(key);
  }
};
