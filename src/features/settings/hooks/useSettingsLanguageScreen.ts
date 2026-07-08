import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import i18n from 'i18next';

import type {AppLanguage} from '../store/settingsSlice';
import {languageChanged} from '../store/settingsSlice';
import type {BottomBarItem} from '../../home/components/HomeBottomBar';
import {useAppDispatch} from '../../../store/hooks';
import {useSelector} from 'react-redux';

type SettingsLanguageStackParamList = {
  Home: undefined;
  Search: undefined;
  Settings: undefined;
  SettingsLanguage: undefined;
};

type SettingsLanguageRootState = {
  settings: {
    language: AppLanguage;
  };
};

type SettingsLanguageNavigationProp = NativeStackNavigationProp<
  SettingsLanguageStackParamList,
  'SettingsLanguage'
>;

function useSettingsLanguageScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SettingsLanguageNavigationProp>();
  const language = useSelector(
    (state: SettingsLanguageRootState) => state.settings.language,
  );

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.replace('Settings');
  }, [navigation]);

  const selectLanguage = useCallback(
    (nextLanguage: AppLanguage) => {
      dispatch(languageChanged(nextLanguage));
      i18n.changeLanguage(nextLanguage);
    },
    [dispatch],
  );

  const handleBottomBarPress = useCallback(
    (item: BottomBarItem) => {
      if (item === 'Home') {
        navigation.navigate('Home');
      }

      if (item === 'Search') {
        navigation.navigate('Search');
      }

      if (item === 'Profile') {
        navigation.navigate('Settings');
      }
    },
    [navigation],
  );

  return {
    goBack,
    handleBottomBarPress,
    language,
    selectLanguage,
  };
}

export default useSettingsLanguageScreen;
