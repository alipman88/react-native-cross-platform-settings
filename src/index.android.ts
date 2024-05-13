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
const destructurer = (entry) => ({ key: entry[0], value: entry[1] });
const transform = (hash, transformer) =>
  Object.fromEntries(Object.entries(hash).map(destructurer).map(transformer));

const serializer = (entry) => [entry.key, JSON.stringify(entry.value)];
const deserializer = (entry) => [entry.key, JSON.parse(entry.value)];

const serialize = (hash) => transform(hash, serializer);
const deserialize = (hash) => transform(hash, deserializer);

/**
 * Memoize data on initialization via the native module's getConstants function.
 * This enables synchronous lookup without the undesirable side-effects of the
 * isBlockingSynchronousMethod option.
 */
const memo = deserialize(SharedPreferences.getConstants());

export const Settings = {
  get(key) {
    return memo[key];
  },

  set(hash) {
    SharedPreferences.set(serialize(hash));
    Object.assign(memo, hash);
  },

  watchKeys(keys, callback) {
    console.warn('Settings.watchKeys is not supported on Android.');
    return -1;
  },

  clearWatch(watchId) {
    console.warn('Settings.clearWatch is not supported on Android.');
  },
};
