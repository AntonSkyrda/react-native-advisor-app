import {useEffect} from 'react';
import {I18nManager} from 'react-native';
import i18n from 'i18next';
import {useSelector} from 'react-redux';

import type {AppLanguage} from '../features/settings/store/settingsSlice';

type LanguageRootState = {
  settings: {
    language: AppLanguage;
  };
};

function LanguageSync(): null {
  const language = useSelector(
    (state: LanguageRootState) => state.settings.language,
  );

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }

    I18nManager.allowRTL(language === 'ar');
  }, [language]);

  return null;
}

export default LanguageSync;
