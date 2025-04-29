import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserModeProvider } from './src/context/UserModeContext';
import { UserProvider } from './src/context/UserContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import HomeScreen from './src/screens/HomeScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { DrawerContent } from './src/navigation/DrawerContent';
import { DriverVerificationScreen } from './src/screens/DriverVerificationScreen';
import { BasicInfoScreen } from './src/screens/BasicInfoScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
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
      <Drawer.Screen 
        name="BasicInfo" 
        component={BasicInfoScreen}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 }
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserModeProvider>
        <UserProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Verification" component={VerificationScreen} />
              <Stack.Screen name="Home" component={HomeDrawer} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </UserModeProvider>
    </GestureHandlerRootView>
  );
}
