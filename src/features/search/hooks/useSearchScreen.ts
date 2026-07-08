import {useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {useSearchPosts} from '../../posts/hooks/usePosts';

function useSearchScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const {data: posts = [], error, isLoading} = useSearchPosts(search);
  const errorMessage =
    posts.length === 0 && error instanceof Error ? error.message : undefined;

  const handlePostPress = (postId: number) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'PostDetails',
        params: {postId},
      }),
    );
  };

  return {
    errorMessage,
    handlePostPress,
    isLoading,
    posts,
    search,
    setSearch,
  };
}

export default useSearchScreen;
