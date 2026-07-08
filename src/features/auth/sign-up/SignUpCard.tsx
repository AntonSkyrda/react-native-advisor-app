import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {Control, FieldErrors} from 'react-hook-form';

import HidePasswordIcon from '../../../assets/icons/hide-password.svg';
import ShowPasswordIcon from '../../../assets/icons/show-password.svg';
import SignUpIcon from '../../../assets/icons/sign-up-icon.svg';
import SignUpField from './SignUpField';
import {
  emailRules,
  nameRules,
  passwordRules,
  type SignUpFormValues,
} from './signUpForm';

type SignUpCardProps = {
  control: Control<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  onTogglePassword: () => void;
  passwordVisible: boolean;
};

function SignUpCard({
  control,
  errors,
  onTogglePassword,
  passwordVisible,
}: SignUpCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <SignUpIcon width={49} height={53} style={styles.accountIcon} />
        <View>
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.subtitle}>Personal Account</Text>
        </View>
      </View>

      <View style={styles.form}>
        <SignUpField
          autoCapitalize="words"
          control={control}
          error={errors.name?.message}
          label="Name"
          name="name"
          rules={nameRules}
          textContentType="name"
        />
        <SignUpField
          autoCapitalize="none"
          control={control}
          error={errors.email?.message}
          keyboardType="email-address"
          label="E-mail"
          name="email"
          rules={emailRules}
          textContentType="emailAddress"
        />
        <SignUpField
          autoCapitalize="none"
          control={control}
          error={errors.password?.message}
          label="Password"
          name="password"
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
          textContentType="newPassword"
        />
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
});

export default SignUpCard;
