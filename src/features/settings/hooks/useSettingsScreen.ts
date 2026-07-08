import {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import {clearAuthStorage, getAuthSession} from '../../auth/storage/secureAuthStorage';
import {authUserChanged} from '../../auth/store/authSlice';
import type {BottomBarItem} from '../../home/components/HomeBottomBar';
import {queryClient} from '../../../lib/queryClient';
import {useAppDispatch} from '../../../store/hooks';

type SettingsStackParamList = {
  Home: undefined;
  Login: undefined;
  Search: undefined;
  Settings: undefined;
  SettingsLanguage: undefined;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  'Settings'
>;

type SettingsUser = {
  image?: string;
  name: string;
};

function useSettingsScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const {t} = useTranslation();
  const [user, setUser] = useState<SettingsUser>({
    name: t('settings.userFallback'),
  });

  useEffect(() => {
    let isMounted = true;

    getAuthSession()
      .then(session => {
        if (!isMounted || !session) {
          return;
        }

        const fullName = [session.firstName, session.lastName]
          .filter(Boolean)
          .join(' ');

        setUser({
          image: session.image,
          name: fullName || session.username || t('settings.userFallback'),
        });
      })
      .catch(() => {
        if (isMounted) {
          setUser({name: t('settings.userFallback')});
        }
      });

    return () => {
      isMounted = false;
    };
  }, [t]);

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.replace('Home');
  }, [navigation]);

  const openLanguageSettings = useCallback(() => {
    navigation.navigate('SettingsLanguage');
  }, [navigation]);

  const logout = useCallback(async () => {
    await clearAuthStorage();
    queryClient.clear();
    dispatch(authUserChanged());
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  }, [dispatch, navigation]);

  const handleBottomBarPress = useCallback(
    (item: BottomBarItem) => {
      if (item === 'Home') {
        navigation.navigate('Home');
      }

      if (item === 'Search') {
        navigation.navigate('Search');
      }
    },
    [navigation],
  );

  return {
    goBack,
    handleBottomBarPress,
    logout,
    openLanguageSettings,
    user,
  };
}

export default useSettingsScreen;
