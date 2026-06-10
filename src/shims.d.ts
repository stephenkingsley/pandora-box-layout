/**
 * Ambient declarations so the `*.native.tsx` files compile WITHOUT pulling the heavy
 * react-native / expo toolchains into THIS package's build. They are declared as OPTIONAL
 * peerDependencies — the consuming app provides the real implementations at runtime.
 *
 * On web, bundlers resolve the plain `*.tsx` and never import these modules. On React Native,
 * Metro resolves the `*.native` files and the real `react-native` / `expo-linear-gradient`
 * are present in the host app.
 */
declare module 'react-native';
declare module 'react-native-svg';
declare module 'expo-linear-gradient';
