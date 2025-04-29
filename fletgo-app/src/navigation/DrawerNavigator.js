import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/HomeScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { DriverVerificationScreen } from '../screens/DriverVerificationScreen';
import { BasicInfoScreen } from '../screens/BasicInfoScreen';
import { IdCardScreen } from '../screens/IdCardScreen';
import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
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
      <Drawer.Screen name="DriverVerification" component={DriverVerificationScreen} />
      <Drawer.Screen 
        name="BasicInfo" 
        component={BasicInfoScreen}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 }
        }}
      />
      <Drawer.Screen 
        name="IdCard" 
        component={IdCardScreen}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 }
        }}
      />
    </Drawer.Navigator>
  );
}
