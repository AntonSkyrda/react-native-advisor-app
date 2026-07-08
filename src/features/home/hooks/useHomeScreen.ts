import {useEffect, useState} from 'react';

import {getAuthSession} from '../../auth/storage/secureAuthStorage';
import {usePosts} from '../../posts/hooks/usePosts';

function useHomeScreen() {
  const [userName, setUserName] = useState('Your name');
  const postsQuery = usePosts(3);

  useEffect(() => {
    let isMounted = true;

    getAuthSession()
      .then(session => {
        if (isMounted && session) {
          const fullName = [session.firstName, session.lastName]
            .filter(Boolean)
            .join(' ');

          setUserName(fullName || session.username);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUserName('Your name');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    posts: postsQuery.data ?? [],
    postsError: postsQuery.error instanceof Error ? postsQuery.error.message : undefined,
    postsLoading: postsQuery.isPending,
    userName,
  };
}

export default useHomeScreen;
