import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  
import { createStackNavigator } from '@react-navigation/stack'; 

import LoginScreen from '../screens/LoginScreen'; 
import HomeScreen from '../screens/HomeScreen';  

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ title: 'Home' }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
