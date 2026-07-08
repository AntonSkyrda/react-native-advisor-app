import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {usePost, usePostComments} from './usePosts';

type PostDetailsRouteParams = {
  PostDetails: {postId: number};
};

type PostDetailsRouteProp = RouteProp<PostDetailsRouteParams, 'PostDetails'>;

function usePostDetailsScreen() {
  const navigation = useNavigation();
  const {
    params: {postId},
  } = useRoute<PostDetailsRouteProp>();
  const {data: post, error, isPending} = usePost(postId);
  const {data: comments = []} = usePostComments(postId);

  const errorMessage = !post && error instanceof Error ? error.message : undefined;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return {
    comments,
    errorMessage,
    handleBackPress,
    isPending,
    post,
  };
}

export default usePostDetailsScreen;
