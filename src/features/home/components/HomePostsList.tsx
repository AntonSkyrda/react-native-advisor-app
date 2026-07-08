import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import type {Post} from '../../posts/types/postTypes';

type HomePostsListProps = {
  error?: string;
  loading: boolean;
  onPostPress: (postId: number) => void;
  posts: Post[];
};

function HomePostsList({
  error,
  loading,
  onPostPress,
  posts,
}: HomePostsListProps): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('home.posts')}</Text>
      {loading ? (
        <Text style={styles.stateText}>{t('home.loadingPosts')}</Text>
      ) : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {posts.map(post => (
        <Pressable
          accessibilityRole="button"
          key={post.id}
          onPress={() => onPostPress(post.id)}
          style={styles.postCard}>
          <Text numberOfLines={1} style={styles.postTitle}>
            {post.title}
          </Text>
          <Text numberOfLines={3} style={styles.postBody}>
            {post.body}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    paddingBottom: 90,
  },
  sectionTitle: {
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 18,
  },
  stateText: {
    marginTop: 10,
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 18,
  },
  errorText: {
    marginTop: 10,
    color: '#E45F2B',
    fontSize: 13,
    lineHeight: 18,
  },
  postCard: {
    minHeight: 86,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  postTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  postBody: {
    marginTop: 4,
    color: '#111827',
    fontSize: 12,
    lineHeight: 15,
  },
});

export default HomePostsList;
