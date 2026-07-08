import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import PostImage from '../../../assets/images/post-image.svg';
import PrimaryButton from '../../../components/PrimaryButton';
import {BackIcon} from '../../auth/sign-up/SignUpIcons';
import usePostDetailsScreen from '../hooks/usePostDetailsScreen';

function PostDetailsScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const {comments, errorMessage, handleBackPress, isPending, post} =
    usePostDetailsScreen();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Pressable
          accessibilityRole="button"
          hitSlop={14}
          onPress={handleBackPress}
          style={styles.backButton}>
          <BackIcon />
        </Pressable>

        <Text style={styles.title}>{t('posts.postName')}</Text>
        <View style={styles.imageWrap}>
          <PostImage width="100%" height={170} />
        </View>

        <Text style={styles.sectionTitle}>{t('posts.about')}</Text>
        <View style={styles.aboutCard}>
          {isPending ? (
            <Text style={styles.stateText}>{t('posts.loadingPost')}</Text>
          ) : null}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          {post ? (
            <>
              <Text style={styles.aboutTitle}>{post.title}</Text>
              <Text style={styles.aboutBody}>{post.body}</Text>
            </>
          ) : null}
        </View>

        <Text style={styles.commentsTitle}>{t('posts.comments')}</Text>
        {comments.slice(0, 3).map(comment => (
          <View key={comment.id} style={styles.commentCard}>
            <Text numberOfLines={1} style={styles.commentName}>
              {comment.name}
            </Text>
            <Text numberOfLines={1} style={styles.commentEmail}>
              {comment.email}
            </Text>
            <Text numberOfLines={5} style={styles.commentBody}>
              {comment.body}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label={t('posts.back')} onPress={handleBackPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F3F5',
  },
  scrollContent: {
    paddingHorizontal: 17,
    paddingBottom: 88,
  },
  backButton: {
    width: 42,
    height: 26,
    justifyContent: 'center',
    marginTop: 10,
  },
  title: {
    marginTop: 20,
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    textAlign: 'center',
  },
  imageWrap: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    marginTop: 20,
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 18,
  },
  aboutCard: {
    minHeight: 172,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  aboutTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textTransform: 'capitalize',
  },
  aboutBody: {
    marginTop: 14,
    color: '#111827',
    fontSize: 13,
    lineHeight: 25,
  },
  commentsTitle: {
    marginTop: 30,
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 18,
  },
  commentCard: {
    minHeight: 122,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  commentName: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  commentEmail: {
    marginTop: 2,
    color: '#111827',
    fontSize: 13,
    lineHeight: 18,
  },
  commentBody: {
    marginTop: 14,
    color: '#111827',
    fontSize: 12,
    lineHeight: 15,
  },
  stateText: {
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 18,
  },
  errorText: {
    color: '#E45F2B',
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    right: 17,
    bottom: 22,
    left: 17,
  },
});

export default PostDetailsScreen;
