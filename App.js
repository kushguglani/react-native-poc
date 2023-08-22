import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store, persistor } from './app/redux/store/user';
import { PersistGate } from 'redux-persist/integration/react'
import { Text } from 'react-native'
import AddDevice from "./app/screens/AddDevice";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen
              name="Signup"
              component={RegisterScreen}
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen name="Signin" component={LoginScreen} />
            <Stack.Screen name="AddDevice" component={AddDevice} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
