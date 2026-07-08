import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SettingsLanguageScreen from '../features/settings/screens/SettingsLanguageScreen';
import SettingsScreen from '../features/settings/screens/SettingsScreen';
import type {SettingsStackParamList} from './navigationTypes';

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsStackNavigator(): React.JSX.Element {
  return (
    <SettingsStack.Navigator screenOptions={{headerShown: false}}>
      <SettingsStack.Screen name="SettingsHome" component={SettingsScreen} />
      <SettingsStack.Screen
        name="SettingsLanguage"
        component={SettingsLanguageScreen}
      />
    </SettingsStack.Navigator>
  );
}

export default SettingsStackNavigator;
