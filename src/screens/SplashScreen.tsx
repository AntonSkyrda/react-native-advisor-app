import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BitcoinIcon from '../components/icons/BitcoinIcon';

function SplashScreen(): React.JSX.Element {
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
