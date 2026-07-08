import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import BitcoinIcon from '../assets/icons/bitcoin-icon.svg';
import {authLocked, authSessionDetected} from '../features/auth/store/authSlice';
import {
  getAuthSession,
  hasSavedPin,
} from '../features/auth/storage/secureAuthStorage';
import type {RootStackParamList} from '../navigation/navigationTypes';
import {useAppDispatch} from '../store/hooks';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const splashDelay = 1600;

function SplashScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SplashScreenNavigationProp>();

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      async function resolveInitialRoute() {
        const [session, savedPin] = await Promise.all([
          getAuthSession(),
          hasSavedPin(),
        ]);
        const hasExistingLogin = Boolean(session && savedPin);

        dispatch(authLocked());
        dispatch(authSessionDetected(hasExistingLogin));
        navigation.replace(hasExistingLogin ? 'UnlockPin' : 'Welcome');
      }

      resolveInitialRoute().catch(() => {
        dispatch(authSessionDetected(false));
        navigation.replace('Welcome');
      });
    }, splashDelay);

    return () => clearTimeout(timerId);
  }, [dispatch, navigation]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.logoBox} accessibilityRole="image">
        <View style={styles.logoMark}>
          <BitcoinIcon width={70} height={92} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoBox: {
    width: 178,
    height: 178,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#FF873D',
  },
  logoMark: {
    transform: [{rotate: '13deg'}],
  },
});

export default SplashScreen;
