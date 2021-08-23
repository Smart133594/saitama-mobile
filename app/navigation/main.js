import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Welcome from "@screens/Welcome";

const Stack = createStackNavigator();
export default function Navigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer >
        <Stack.Navigator
          screenOptions={{ animationEnabled: false, headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
