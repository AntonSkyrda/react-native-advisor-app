import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import type {Control, FieldErrors, RegisterOptions} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import HidePasswordIcon from '../../../assets/icons/hide-password.svg';
import ShowPasswordIcon from '../../../assets/icons/show-password.svg';
import SignInIcon from '../../../assets/icons/sign-in-icon.svg';
import PrimaryButton from '../../../components/PrimaryButton';
import LoginField from './LoginField';
import type {LoginFormValues} from './loginForm';

type LoginCardProps = {
  biometryLabel: string | null;
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  isBiometryAvailable: boolean;
  isLoading: boolean;
  onCreateAccount: () => void;
  onLoginWithBiometry: () => void;
  onSubmit: () => void;
  onTogglePassword: () => void;
  passwordVisible: boolean;
  passwordRules: RegisterOptions<LoginFormValues, 'password'>;
  submitError?: string;
  usernameRules: RegisterOptions<LoginFormValues, 'username'>;
};

function LoginCard({
  biometryLabel,
  control,
  errors,
  isBiometryAvailable,
  isLoading,
  onCreateAccount,
  onLoginWithBiometry,
  onSubmit,
  onTogglePassword,
  passwordVisible,
  passwordRules,
  submitError,
  usernameRules,
}: LoginCardProps): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <SignInIcon width={49} height={49} style={styles.accountIcon} />
        <View>
          <Text style={styles.title}>{t('auth.loginTitle')}</Text>
          <Text style={styles.subtitle}>{t('auth.accountSubtitle')}</Text>
        </View>
      </View>

      <View style={styles.form}>
        <LoginField
          autoCapitalize="none"
          control={control}
          error={errors.username?.message}
          keyboardType="email-address"
          label={t('auth.email')}
          name="username"
          placeholder="emilys"
          rules={usernameRules}
          textContentType="username"
        />
        <LoginField
          autoCapitalize="none"
          control={control}
          error={errors.password?.message}
          label={t('auth.password')}
          name="password"
          placeholder="emilyspass"
          rightElement={
            <Pressable
              accessibilityRole="button"
              hitSlop={10}
              onPress={onTogglePassword}>
              {passwordVisible ? (
                <HidePasswordIcon width={20} height={14} />
              ) : (
                <ShowPasswordIcon width={24} height={24} />
              )}
            </Pressable>
          }
          rules={passwordRules}
          secureTextEntry={!passwordVisible}
          textContentType="password"
        />

        {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}

        <PrimaryButton
          disabled={isLoading}
          label={isLoading ? t('auth.signingIn') : t('common.continue')}
          onPress={onSubmit}
        />

        {isLoading ? <ActivityIndicator color="#FF873D" style={styles.loader} /> : null}

        {isBiometryAvailable ? (
          <Pressable
            accessibilityRole="button"
            onPress={onLoginWithBiometry}
            style={styles.biometryButton}>
            <Text style={styles.biometryText}>
              {t('auth.useBiometry', {label: biometryLabel})}
            </Text>
          </Pressable>
        ) : null}

        <Pressable
          accessibilityRole="button"
          onPress={onCreateAccount}
          style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>
            {t('auth.createAccount')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 100,
    overflow: 'hidden',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E9F0',
  },
  accountIcon: {
    marginRight: 12,
  },
  title: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
  },
  subtitle: {
    marginTop: 1,
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 17,
  },
  form: {
    paddingTop: 18,
    paddingHorizontal: 17,
    paddingBottom: 116,
  },
  submitError: {
    marginTop: -4,
    marginBottom: 12,
    color: '#E45F2B',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  loader: {
    marginTop: 12,
  },
  biometryButton: {
    alignSelf: 'center',
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  biometryText: {
    color: '#00A98F',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  createAccountButton: {
    alignSelf: 'center',
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 2,
  },
  createAccountText: {
    color: '#FF873D',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
});

export default LoginCard;
