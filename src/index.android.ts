import { NativeModules } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-cross-platform-settings' doesn't seem to be linked. Make sure: \n\n` +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const SharedPreferences = NativeModules.SharedPreferences
  ? NativeModules.SharedPreferences
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

// JSON serialization helpers
const transformValues = (
  hash: Map<string, string>,
  transformer: Function
): Map<string, any> => {
  let result = new Map<string, any>();

  for (const [key, value] of Object.entries(hash)) {
    result.set(key, transformer(value));
  }

  return result;
};

const serialize = (hash: Map<string, any>): Map<string, string> => {
  return transformValues(hash, JSON.stringify);
};

const deserialize = (hash: Map<string, string>): Map<string, any> => {
  return transformValues(hash, JSON.parse);
};

/**
 * Memoize data on initialization via the native module's getConstants function.
 * This enables synchronous lookup without the undesirable side-effects of the
 * isBlockingSynchronousMethod option.
 */
const memo = deserialize(SharedPreferences.getConstants());

export const Settings = {
  get(key: string): any {
    return memo.get(key);
  },

  set(hash: Map<string, any>) {
    SharedPreferences.set(Object.fromEntries(serialize(hash)));

    for (const [key, value] of Object.entries(hash)) {
      memo.set(key, value);
    }
  },

  watchKeys(): number {
    console.warn('Settings.watchKeys is not supported on Android.');
    return -1;
  },

  clearWatch() {
    console.warn('Settings.clearWatch is not supported on Android.');
  },
};
