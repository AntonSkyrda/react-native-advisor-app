import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../features/auth/screens/LoginScreen';
import PinCodeScreen from '../features/auth/screens/PinCodeScreen';
import SignUpScreen from '../features/auth/screens/SignUpScreen';
import PostDetailsScreen from '../features/posts/screens/PostDetailsScreen';
import WelcomeScreen from '../features/welcome/screens/WelcomeScreen';
import SplashScreen from '../screens/SplashScreen';
import MainTabsNavigator from './MainTabsNavigator';
import type {RootStackParamList} from './navigationTypes';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Welcome" component={WelcomeScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="SignUp" component={SignUpScreen} />
        <RootStack.Screen name="CreatePin">
          {() => <PinCodeScreen mode="create" />}
        </RootStack.Screen>
        <RootStack.Screen name="UnlockPin">
          {() => <PinCodeScreen mode="unlock" />}
        </RootStack.Screen>
        <RootStack.Screen name="MainTabs" component={MainTabsNavigator} />
        <RootStack.Screen name="PostDetails" component={PostDetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
