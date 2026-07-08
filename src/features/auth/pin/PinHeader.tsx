import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import PinIcon from '../../../assets/icons/pin-icon.svg';
import PinDots from './PinDots';

type PinHeaderProps = {
  error?: string;
  pinLength: number;
  subtitle: string;
  title: string;
  valueLength: number;
};

function PinHeader({
  error,
  pinLength,
  subtitle,
  title,
  valueLength,
}: PinHeaderProps): React.JSX.Element {
  return (
    <View style={styles.header}>
      <PinIcon width={49} height={49} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <PinDots
        hasError={Boolean(error)}
        length={pinLength}
        valueLength={valueLength}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 8,
  },
  title: {
    marginTop: 18,
    color: '#111827',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 28,
    color: '#8F9AAB',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 16,
    color: '#E45F2B',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default PinHeader;
