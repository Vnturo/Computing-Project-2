import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CampusMapScreen from '../screens/CampusMapScreen';
import WebViewScreen from '../screens/WebViewScreen'; // Ensure this file exists

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hides headers for a cleaner look
          gestureEnabled: true, // Enables swipe gestures for navigation
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CampusMap" component={CampusMapScreen} />
        <Stack.Screen 
          name="WebView" 
          component={WebViewScreen} 
          initialParams={{ url: 'https://www.gold.ac.uk' }} // Fallback URL
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
