import {postsApiClient} from '../../../lib/postsApiClient';
import type {Post, PostComment} from '../types/postTypes';

export async function getPosts(limit = 3): Promise<Post[]> {
  const {data} = await postsApiClient.get<Post[]>('/posts', {
    params: {_limit: limit},
  });

  return data;
}

export async function getPost(postId: number): Promise<Post> {
  const {data} = await postsApiClient.get<Post>(`/posts/${postId}`);

  return data;
}

export async function getPostComments(postId: number): Promise<PostComment[]> {
  const {data} = await postsApiClient.get<PostComment[]>(
    `/posts/${postId}/comments`,
  );

  return data;
}
