import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import i18n from 'i18next';
import {useSelector} from 'react-redux';

import type {AppLanguage} from '../store/settingsSlice';
import {languageChanged} from '../store/settingsSlice';
import type {SettingsStackParamList} from '../../../navigation/navigationTypes';
import {useAppDispatch} from '../../../store/hooks';

type SettingsLanguageRootState = {
  settings: {
    language: AppLanguage;
  };
};

type SettingsLanguageNavigationProp = NavigationProp<SettingsStackParamList>;

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

    navigation.navigate('SettingsHome');
  }, [navigation]);

  const selectLanguage = useCallback(
    (nextLanguage: AppLanguage) => {
      dispatch(languageChanged(nextLanguage));
      i18n.changeLanguage(nextLanguage);
    },
    [dispatch],
  );

  return {
    goBack,
    language,
    selectLanguage,
  };
}

export default useSettingsLanguageScreen;
