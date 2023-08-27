import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store, persistor } from './app/redux/store/user';
import { PersistGate } from 'redux-persist/integration/react'
import { Text } from 'react-native'
import NavigationApp from "./app/components/NavigationApp";
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationApp />
      </PersistGate>
    </Provider>
  );
}
