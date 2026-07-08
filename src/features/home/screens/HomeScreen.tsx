import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import type {RootStackParamList} from '../../../navigation/types';
import BeforeYouStart from '../components/BeforeYouStart';
import HomeBottomBar from '../components/HomeBottomBar';
import HomeHeader from '../components/HomeHeader';
import HomePostsList from '../components/HomePostsList';
import PersonalAdvisorCard from '../components/PersonalAdvisorCard';
import useHomeScreen from '../hooks/useHomeScreen';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {posts, postsError, postsLoading, userName} = useHomeScreen();

  return (
    <SafeAreaView style={styles.screen}>
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
            onPostPress={postId => navigation.navigate('PostDetails', {postId})}
            posts={posts}
          />
        </View>
      </ScrollView>
      <HomeBottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F3F5',
  },
  scrollContent: {
    paddingBottom: 76,
  },
  content: {
    paddingHorizontal: 17,
    marginTop: 18,
  },
});

export default HomeScreen;
