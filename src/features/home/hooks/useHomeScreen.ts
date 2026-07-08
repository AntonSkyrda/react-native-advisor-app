import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {getAuthSession} from '../../auth/storage/secureAuthStorage';
import {usePosts} from '../../posts/hooks/usePosts';

function useHomeScreen() {
  const {t} = useTranslation();
  const [userName, setUserName] = useState(t('home.userFallback'));
  const postsQuery = usePosts(3);

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

  return {
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
