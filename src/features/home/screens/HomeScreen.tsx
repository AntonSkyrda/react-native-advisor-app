import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BeforeYouStart from '../components/BeforeYouStart';
import HomeHeader from '../components/HomeHeader';
import HomePostsList from '../components/HomePostsList';
import PersonalAdvisorCard from '../components/PersonalAdvisorCard';
import useHomeScreen from '../hooks/useHomeScreen';

function HomeScreen(): React.JSX.Element {
  const {handlePostPress, posts, postsError, postsLoading, userName} =
    useHomeScreen();

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <HomeHeader userName={userName} />
        <View style={styles.content}>
          <PersonalAdvisorCard />
          <BeforeYouStart />
          <HomePostsList
            error={postsError}
            loading={postsLoading}
            onPostPress={handlePostPress}
            posts={posts}
          />
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
    paddingBottom: 18,
  },
  content: {
    paddingHorizontal: 17,
    marginTop: 18,
  },
});

export default HomeScreen;
