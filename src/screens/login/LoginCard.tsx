import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import type {Control, FieldErrors} from 'react-hook-form';

import PrimaryButton from '../../components/PrimaryButton';
import HidePasswordIcon from '../../assets/icons/hide-password.svg';
import ShowPasswordIcon from '../../assets/icons/show-password.svg';
import SignInIcon from '../../assets/icons/sign-in-icon.svg';
import LoginField from './LoginField';
import {
  loginPasswordRules,
  type LoginFormValues,
  usernameRules,
} from './loginForm';

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
  submitError?: string;
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
  submitError,
}: LoginCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <SignInIcon width={49} height={49} style={styles.accountIcon} />
        <View>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Personal Account</Text>
        </View>
      </View>

      <View style={styles.form}>
        <LoginField
          autoCapitalize="none"
          control={control}
          error={errors.username?.message}
          keyboardType="email-address"
          label="Email"
          name="username"
          placeholder="emilys"
          rules={usernameRules}
          textContentType="username"
        />
        <LoginField
          autoCapitalize="none"
          control={control}
          error={errors.password?.message}
          label="Password"
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
          rules={loginPasswordRules}
          secureTextEntry={!passwordVisible}
          textContentType="password"
        />

        {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}

        <PrimaryButton
          disabled={isLoading}
          label={isLoading ? 'Signing in...' : 'Continue'}
          onPress={onSubmit}
        />

        {isLoading ? <ActivityIndicator color="#FF873D" style={styles.loader} /> : null}

        {isBiometryAvailable ? (
          <Pressable
            accessibilityRole="button"
            onPress={onLoginWithBiometry}
            style={styles.biometryButton}>
            <Text style={styles.biometryText}>Use {biometryLabel}</Text>
          </Pressable>
        ) : null}

        <Pressable
          accessibilityRole="button"
          onPress={onCreateAccount}
          style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Create Account</Text>
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
