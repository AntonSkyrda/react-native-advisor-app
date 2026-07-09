import {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {getAuthSession} from '../../auth/storage/secureAuthStorage';
import {usePosts} from '../../posts/hooks/usePosts';

function useHomeScreen() {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [userName, setUserName] = useState(t('home.userFallback'));
  const postsQuery = usePosts(3);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#FF873D');

      return () => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#FFFFFF');
      };
    }, []),
  );

  useEffect(() => {
    let isMounted = true;

    getAuthSession()
      .then(session => {
        if (isMounted && session) {
          const fullName = [session.firstName, session.lastName]
            .filter(Boolean)
            .join(' ');

          setUserName(fullName || session.username || t('home.userFallback'));
        }
      })
      .catch(() => {
        if (isMounted) {
          setUserName(t('home.userFallback'));
        }
      });

    return () => {
      isMounted = false;
    };
  }, [t]);

  const handlePostPress = (postId: number) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'PostDetails',
        params: {postId},
      }),
    );
  };

  return {
    handlePostPress,
    posts: postsQuery.data ?? [],
    postsError:
      !postsQuery.data && postsQuery.error instanceof Error
        ? postsQuery.error.message
        : undefined,
    postsLoading: postsQuery.isPending,
    userName,
  };
}

export default useHomeScreen;
