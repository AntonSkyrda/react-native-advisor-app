import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import type {RootStackParamList} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Welcome"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Welcome" component={WelcomeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
