import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DriverVerificationScreen } from '../screens/DriverVerificationScreen';
import { BasicInfoScreen } from '../screens/BasicInfoScreen';

const Stack = createStackNavigator();

export function DriverVerificationNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        presentation: 'card'
      }}
    >
      <Stack.Screen 
        name="VerificationMain" 
        component={DriverVerificationScreen} 
      />
      <Stack.Screen 
        name="BasicInfo" 
        component={BasicInfoScreen} 
      />
    </Stack.Navigator>
  );
}
