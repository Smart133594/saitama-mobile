import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SignIn from "@screens/SignIn";
import SignUp from "@screens/SignUp";
import ActiveAccount from "@screens/ActiveAccount";
import ForgotPassword from "@screens/ForgotPassword";
import RecoverPassword from "@screens/RecoverPassword";
import ChangePassword from "@screens/ChangePassword";
import Terms from "@screens/Terms";
import PrivacyPolicy from "@screens/PrivacyPolicy";
import Welcome from "@screens/Welcome";
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer >
        <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="ActiveAccount" component={ActiveAccount} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

