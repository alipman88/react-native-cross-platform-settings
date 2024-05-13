## Installation

```sh
yarn add react-native-cross-platform-settings
```

## Usage

React Native provides a Settings API, acting as a persistent key–value data store with synchronous lookup: [https://reactnative.dev/docs/settings](https://reactnative.dev/docs/settings)

However, the Settings API is only available to iOS applications. This package adds Android support, wrapping Android's [SharedPreferences](https://developer.android.com/training/data-storage/shared-preferences) for storage.

```js
import { Settings } from 'react-native-cross-platform-settings';

Settings.set({ name: 'Aaron' });
Settings.get('name')
// 'Aaron'
```

_Note that the `watchKeys` and `clearWatch` functions are not supported on Android._

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
