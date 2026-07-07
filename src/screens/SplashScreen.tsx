import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Text as SvgText} from 'react-native-svg';

function SplashScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.logoBox} accessibilityRole="image">
        <BitcoinMark />
      </View>
    </SafeAreaView>
  );
}

function BitcoinMark(): React.JSX.Element {
  return (
    <Svg width={96} height={96} viewBox="0 0 96 96">
      <SvgText
        x="48"
        y="72"
        fill="#FFFFFF"
        fontSize="84"
        fontWeight="700"
        textAnchor="middle"
        transform="rotate(13 48 48)">
        ₿
      </SvgText>
    </Svg>
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
});

export default SplashScreen;
