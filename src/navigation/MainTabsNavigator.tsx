import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';

import HomeIcon from '../assets/icons/home-icon.svg';
import PortfolioIcon from '../assets/icons/portfolio-icon.svg';
import ProfileIcon from '../assets/icons/profile-bar-icon.svg';
import SearchIcon from '../assets/icons/search-icon.svg';
import HomeScreen from '../features/home/screens/HomeScreen';
import PortfolioScreen from '../features/portfolio/screens/PortfolioScreen';
import SearchScreen from '../features/search/screens/SearchScreen';
import SettingsStackNavigator from './SettingsStackNavigator';
import type {MainTabParamList} from './navigationTypes';

const MainTabs = createBottomTabNavigator<MainTabParamList>();

function renderHomeIcon() {
  return <HomeIcon width={22} height={22} />;
}

function renderPortfolioIcon() {
  return <PortfolioIcon width={22} height={22} />;
}

function renderSearchIcon() {
  return <SearchIcon width={22} height={22} />;
}

function renderProfileIcon() {
  return <ProfileIcon width={22} height={22} />;
}

function MainTabsNavigator(): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <MainTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FA8A34',
        tabBarInactiveTintColor: '#606773',
        tabBarLabelStyle: {
          fontSize: 10,
          lineHeight: 13,
        },
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopColor: '#E5E9F0',
          backgroundColor: '#FFFFFF',
        },
      }}>
      <MainTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: renderHomeIcon,
          tabBarLabel: t('bottomBar.home'),
        }}
      />
      <MainTabs.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: renderPortfolioIcon,
          tabBarLabel: t('bottomBar.portfolio'),
        }}
      />
      <MainTabs.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: renderSearchIcon,
          tabBarLabel: t('bottomBar.search'),
        }}
      />
      <MainTabs.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: renderProfileIcon,
          tabBarLabel: t('bottomBar.profile'),
        }}
      />
    </MainTabs.Navigator>
  );
}

export default MainTabsNavigator;
