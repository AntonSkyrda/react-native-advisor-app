import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import SearchIcon from '../../../assets/icons/search-icon.svg';
import useSearchScreen from '../hooks/useSearchScreen';

function SearchScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const {
    errorMessage,
    handlePostPress,
    isLoading,
    posts,
    search,
    setSearch,
  } = useSearchScreen();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('search.title')}</Text>
        <View style={styles.searchBox}>
          <SearchIcon width={18} height={18} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setSearch}
            placeholder={t('search.placeholder')}
            placeholderTextColor="#A1A7B2"
            returnKeyType="search"
            style={styles.searchInput}
            value={search}
          />
        </View>

        <View style={styles.results}>
          {isLoading ? (
            <ActivityIndicator color="#FA8A34" style={styles.loader} />
          ) : null}
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          {!isLoading && !errorMessage && posts.length === 0 ? (
            <Text style={styles.emptyText}>{t('search.empty')}</Text>
          ) : null}
          {posts.map(post => (
            <Pressable
              accessibilityRole="button"
              key={post.id}
              onPress={() => handlePostPress(post.id)}
              style={styles.resultCard}>
              <Text style={styles.postId}>{t('search.id', {id: post.id})}</Text>
              <Text numberOfLines={1} style={styles.postName}>
                {t('search.name', {name: post.title})}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F3F5',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 18,
  },
  title: {
    color: '#171B22',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  searchBox: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    marginLeft: 10,
    color: '#171B22',
    fontSize: 14,
    lineHeight: 18,
  },
  results: {
    marginTop: 16,
  },
  loader: {
    marginTop: 18,
  },
  errorText: {
    marginTop: 18,
    color: '#E45F2B',
    fontSize: 13,
    lineHeight: 18,
  },
  emptyText: {
    marginTop: 18,
    color: '#606773',
    fontSize: 13,
    lineHeight: 18,
  },
  resultCard: {
    minHeight: 63,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 11,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  postId: {
    color: '#171B22',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  postName: {
    marginTop: 2,
    color: '#606773',
    fontSize: 13,
    lineHeight: 18,
    textTransform: 'capitalize',
  },
});

export default SearchScreen;
