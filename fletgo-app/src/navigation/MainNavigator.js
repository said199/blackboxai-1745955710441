import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerContent } from './DrawerContent';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { DriverVerificationScreen } from '../screens/DriverVerificationScreen';

// Importar las pantallas de verificación (se crearán después)
const BasicInfoScreen = () => <View style={{flex: 1, backgroundColor: '#fff'}} />;
const IdCardScreen = () => <View style={{flex: 1, backgroundColor: '#fff'}} />;
const DriversLicenseScreen = () => <View style={{flex: 1, backgroundColor: '#fff'}} />;
const BackgroundCheckScreen = () => <View style={{flex: 1, backgroundColor: '#fff'}} />;
const VehicleInfoScreen = () => <View style={{flex: 1, backgroundColor: '#fff'}} />;
const BankAccountScreen = () => <View style={{flex: 1, backgroundColor: '#fff'}} />;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '75%',
          backgroundColor: 'transparent',
          elevation: 0,
        },
        overlayColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
      <Drawer.Screen 
        name="DriverVerification" 
        component={DriverVerificationScreen}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 }
        }}
      />
    </Drawer.Navigator>
  );
}

// Stack Navigator para las pantallas de verificación
function VerificationNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VerificationMain" component={DriverVerificationScreen} />
      <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      <Stack.Screen name="IdCard" component={IdCardScreen} />
      <Stack.Screen name="DriversLicense" component={DriversLicenseScreen} />
      <Stack.Screen name="BackgroundCheck" component={BackgroundCheckScreen} />
      <Stack.Screen name="VehicleInfo" component={VehicleInfoScreen} />
      <Stack.Screen name="BankAccount" component={BankAccountScreen} />
    </Stack.Navigator>
  );
}

export function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
        <Stack.Screen name="Verification" component={VerificationNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
