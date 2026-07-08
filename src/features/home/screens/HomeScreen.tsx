import React, {useCallback} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BeforeYouStart from '../components/BeforeYouStart';
import HomeHeader from '../components/HomeHeader';
import HomePostsList from '../components/HomePostsList';
import PersonalAdvisorCard from '../components/PersonalAdvisorCard';
import useHomeScreen from '../hooks/useHomeScreen';

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const {posts, postsError, postsLoading, userName} = useHomeScreen();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#FF873D');

      return () => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#FFFFFF');
      };
    }, []),
  );

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
            onPostPress={postId =>
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'PostDetails',
                  params: {postId},
                }),
              )
            }
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
