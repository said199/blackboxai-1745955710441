import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DriverVerificationScreen } from '../screens/DriverVerificationScreen';
import { BasicInfoScreen } from '../screens/BasicInfoScreen';

const Stack = createStackNavigator();

export function VerificationNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VerificationMain" component={DriverVerificationScreen} />
      <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
    </Stack.Navigator>
  );
}
