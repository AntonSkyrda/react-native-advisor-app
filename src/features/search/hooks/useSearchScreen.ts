import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {BottomBarItem} from '../../home/components/HomeBottomBar';
import {useSearchPosts} from '../../posts/hooks/usePosts';

type SearchStackParamList = {
  Home: undefined;
  PostDetails: {postId: number};
  Search: undefined;
};

type SearchScreenNavigationProp = NativeStackNavigationProp<
  SearchStackParamList,
  'Search'
>;

function useSearchScreen() {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [search, setSearch] = useState('');
  const {data: posts = [], error, isLoading} = useSearchPosts(search);
  const errorMessage = error instanceof Error ? error.message : undefined;

  const handlePostPress = (postId: number) => {
    navigation.navigate('PostDetails', {postId});
  };

  const handleBottomBarPress = (item: BottomBarItem) => {
    if (item === 'Home') {
      navigation.navigate('Home');
    }
  };

  return {
    errorMessage,
    handleBottomBarPress,
    handlePostPress,
    isLoading,
    posts,
    search,
    setSearch,
  };
}

export default useSearchScreen;
