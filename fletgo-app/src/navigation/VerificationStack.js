import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DriverVerificationScreen } from '../screens/DriverVerificationScreen';
import { BasicInfoScreen } from '../screens/BasicInfoScreen';
import { IdCardScreen } from '../screens/IdCardScreen';
import { LicenseScreen } from '../screens/LicenseScreen';

const Stack = createNativeStackNavigator();

export function VerificationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VerificationMain" component={DriverVerificationScreen} />
      <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      <Stack.Screen name="IdCard" component={IdCardScreen} />
      <Stack.Screen name="License" component={LicenseScreen} />
    </Stack.Navigator>
  );
}
