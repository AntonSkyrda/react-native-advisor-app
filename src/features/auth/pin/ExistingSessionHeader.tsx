import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import ProfileIcon from '../../../assets/icons/profile.svg';
import PinDots from './PinDots';

type ExistingSessionHeaderProps = {
  error?: string;
  onChangeAccount: () => void;
  pinLength: number;
  userLabel: string;
  valueLength: number;
};

function ExistingSessionHeader({
  error,
  onChangeAccount,
  pinLength,
  userLabel,
  valueLength,
}: ExistingSessionHeaderProps): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={styles.header}>
      <View style={styles.profileIcon}>
        <ProfileIcon width={22} height={22} />
      </View>
      <Text style={styles.userLabel}>{userLabel}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onChangeAccount}
        style={styles.changeButton}>
        <Text style={styles.changeText}>{t('auth.changeAccount')}</Text>
      </Pressable>

      <Text style={styles.subtitle}>
        {t('auth.enterPinCapitalized', {count: pinLength})}
      </Text>
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
  profileIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: '#7ED7C9',
  },
  userLabel: {
    marginTop: 17,
    color: '#111827',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'center',
  },
  changeButton: {
    minHeight: 24,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  changeText: {
    color: '#FF873D',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 22,
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

export default ExistingSessionHeader;
