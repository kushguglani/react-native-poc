import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDevice from "../screens/AddDevice";
import DeviceDashboard from "../screens/DeviceDashboard";
import DeviceList from "../screens/DeviceList";
const Stack = createNativeStackNavigator();
export default function NavigationApp() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={WelcomeScreen}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="AddDevice" component={AddDevice} />
                <Stack.Screen name="Dashboard" component={DeviceDashboard} />
                <Stack.Screen name="Signin" component={LoginScreen} />
                <Stack.Screen name="Devices" component={DeviceList} />
                <Stack.Screen
                    name="Signup"
                    component={RegisterScreen}
                    options={{ title: 'Welcome' }}
                />
            </Stack.Navigator>

        </NavigationContainer >
    );
}
