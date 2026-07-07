import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BitcoinIcon from '../components/icons/BitcoinIcon';
import WelcomeFeatureCard, {
  welcomeCardShadow,
} from './welcome/WelcomeFeatureCard';
import {welcomeCards, type WelcomeCardName} from './welcome/welcomeCards';

const cardPositions: Record<WelcomeCardName, object> = {
  one: {top: 130, right: 0},
  two: {top: 208, left: 0},
  three: {top: 326, right: 0},
  four: {top: 360, left: 0},
  five: {top: 488, right: 0},
};

function WelcomeScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={[styles.logoCard, welcomeCardShadow]}>
          <View style={styles.logoMark}>
            <BitcoinIcon width={72} height={96} />
          </View>
        </View>

        {welcomeCards.map(card => (
          <WelcomeFeatureCard
            key={card.position}
            label={card.label}
            coins={card.coins}
            style={cardPositions[card.position]}
          />
        ))}

        <View style={styles.actions}>
          <Pressable style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </Pressable>
          <Pressable style={styles.signUpButton}>
            <Text style={styles.signUpText}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F3F5',
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
  },
  logoCard: {
    position: 'absolute',
    top: 54,
    left: 0,
    width: 164,
    height: 138,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#FF873D',
    shadowOpacity: 0,
    elevation: 0,
  },
  logoMark: {
    transform: [{rotate: '13deg'}],
  },
  actions: {
    position: 'absolute',
    right: 0,
    bottom: 39,
    left: 0,
    alignItems: 'stretch',
  },
  signInButton: {
    alignSelf: 'center',
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 18,
  },
  signInText: {
    color: '#FF873D',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  signUpButton: {
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#FF873D',
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
});

export default WelcomeScreen;
