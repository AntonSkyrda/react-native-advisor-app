import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../../../components/PrimaryButton';
import ExistingSessionHeader from '../pin/ExistingSessionHeader';
import PinHeader from '../pin/PinHeader';
import PinKeypad from '../pin/PinKeypad';
import useCreatePinScreen from '../pin/useCreatePinScreen';
import useUnlockPinScreen from '../pin/useUnlockPinScreen';
import {BackIcon} from '../sign-up/SignUpIcons';

type PinCodeScreenProps = {
  mode: 'create' | 'unlock';
};

function PinCodeScreen({mode}: PinCodeScreenProps): React.JSX.Element {
  return mode === 'create' ? <CreatePinMode /> : <UnlockPinMode />;
}

function CreatePinMode(): React.JSX.Element {
  const {t} = useTranslation();
  const {
    appendDigit,
    error,
    goBack,
    isSaving,
    pinLength,
    removeDigit,
    step,
    submitPin,
    value,
  } = useCreatePinScreen();

  return (
    <PinCodeLayout
      footerLabel={isSaving ? t('auth.saving') : t('common.continue')}
      footerDisabled={isSaving}
      header={
        <>
          <Pressable
            accessibilityRole="button"
            hitSlop={14}
            onPress={goBack}
            style={styles.backButton}>
            <BackIcon />
          </Pressable>
          <PinHeader
            error={error}
            pinLength={pinLength}
            subtitle={t('auth.enterPin', {count: pinLength})}
            title={
              step === 'create'
                ? t('auth.createPinTitle')
                : t('auth.confirmPinTitle')
            }
            valueLength={value.length}
          />
        </>
      }
      onDelete={removeDigit}
      onDigitPress={appendDigit}
      onSubmit={submitPin}
    />
  );
}

function UnlockPinMode(): React.JSX.Element {
  const {t} = useTranslation();
  const {
    appendDigit,
    biometryLabel,
    changeAccount,
    error,
    isBiometryAvailable,
    isChecking,
    loginWithBiometry,
    pinLength,
    removeDigit,
    submitPin,
    userLabel,
    value,
  } = useUnlockPinScreen();

  return (
    <PinCodeLayout
      contentStyle={styles.unlockContent}
      footerLabel={isChecking ? t('auth.checking') : t('common.continue')}
      footerDisabled={isChecking}
      header={
        <>
          <ExistingSessionHeader
            error={error}
            onChangeAccount={changeAccount}
            pinLength={pinLength}
            userLabel={userLabel}
            valueLength={value.length}
          />
          {isBiometryAvailable ? (
            <Pressable
              accessibilityRole="button"
              onPress={loginWithBiometry}
              style={styles.biometryButton}>
              <Text style={styles.biometryText}>
                {t('auth.useBiometry', {label: biometryLabel})}
              </Text>
            </Pressable>
          ) : null}
        </>
      }
      onDelete={removeDigit}
      onDigitPress={appendDigit}
      onSubmit={submitPin}
    />
  );
}

type PinCodeLayoutProps = {
  contentStyle?: StyleProp<ViewStyle>;
  footerDisabled: boolean;
  footerLabel: string;
  header: React.ReactNode;
  onDelete: () => void;
  onDigitPress: (digit: string) => void;
  onSubmit: () => void;
};

function PinCodeLayout({
  contentStyle,
  footerDisabled,
  footerLabel,
  header,
  onDelete,
  onDigitPress,
  onSubmit,
}: PinCodeLayoutProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.content, contentStyle]}>
        {header}

        <PinKeypad onDelete={onDelete} onDigitPress={onDigitPress} />

        <View style={styles.footer}>
          <PrimaryButton
            disabled={footerDisabled}
            label={footerLabel}
            onPress={onSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 17,
  },
  unlockContent: {
    paddingTop: 44,
  },
  backButton: {
    width: 42,
    height: 26,
    justifyContent: 'center',
    marginTop: 10,
  },
  biometryButton: {
    alignSelf: 'center',
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginTop: 18,
  },
  biometryText: {
    color: '#00A98F',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  footer: {
    paddingBottom: 15,
  },
});

export default PinCodeScreen;
