import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

export type WelcomeCoin = {
  backgroundColor: string;
  content: React.ReactNode;
};

type WelcomeFeatureCardProps = {
  coins: WelcomeCoin[];
  label: string;
  style: StyleProp<ViewStyle>;
};

function WelcomeFeatureCard({
  coins,
  label,
  style,
}: WelcomeFeatureCardProps): React.JSX.Element {
  return (
    <View style={[styles.card, styles.featureCard, style]}>
      <View style={styles.coinRow}>
        {coins.map((coin, index) => (
          <View
            key={`${label}-${index}`}
            style={[
              styles.coin,
              {backgroundColor: coin.backgroundColor},
              index > 0 && styles.coinOverlap,
              index === 1 && styles.frontCoin,
            ]}>
            {coin.content}
          </View>
        ))}
      </View>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
}

export const welcomeCardShadow = {
  shadowColor: '#202A34',
  shadowOffset: {width: 0, height: 14},
  shadowOpacity: 0.08,
  shadowRadius: 30,
  elevation: 5,
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    ...welcomeCardShadow,
  },
  featureCard: {
    width: 164,
    height: 136,
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  coin: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  coinOverlap: {
    marginLeft: -11,
  },
  frontCoin: {
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
    elevation: 1,
  },
  cardLabel: {
    color: '#68717D',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
});

export default WelcomeFeatureCard;
