import {useQuery} from '@tanstack/react-query';

import {getPost, getPostComments, getPosts, searchPosts} from '../api/postsApi';

export const postsQueryKey = ['posts'] as const;

export function usePosts(limit = 3) {
  return useQuery({
    queryFn: () => getPosts(limit),
    queryKey: [...postsQueryKey, limit],
  });
}

export function useSearchPosts(search: string) {
  return useQuery({
    queryFn: () => searchPosts(search),
    queryKey: [...postsQueryKey, 'search', search],
  });
}

export function usePost(postId: number) {
  return useQuery({
    queryFn: () => getPost(postId),
    queryKey: [...postsQueryKey, 'details', postId],
  });
}

export function usePostComments(postId: number) {
  return useQuery({
    queryFn: () => getPostComments(postId),
    queryKey: [...postsQueryKey, 'comments', postId],
  });
}
