import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import LoginCard from '../login/LoginCard';
import useLoginScreen from '../login/useLoginScreen';
import {BackIcon} from '../sign-up/SignUpIcons';

function LoginScreen(): React.JSX.Element {
  const {
    biometryLabel,
    control,
    createAccount,
    errors,
    goBack,
    isBiometryAvailable,
    isLoading,
    loginWithBiometry,
    passwordVisible,
    passwordRules,
    submitError,
    submitLogin,
    togglePasswordVisibility,
    usernameRules,
  } = useLoginScreen();

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: 'height'})}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Pressable
            accessibilityRole="button"
            hitSlop={14}
            onPress={goBack}
            style={styles.backButton}>
            <BackIcon />
          </Pressable>

          <LoginCard
            biometryLabel={biometryLabel}
            control={control}
            errors={errors}
            isBiometryAvailable={isBiometryAvailable}
            isLoading={isLoading}
            onCreateAccount={createAccount}
            onLoginWithBiometry={loginWithBiometry}
            onSubmit={submitLogin}
            onTogglePassword={togglePasswordVisibility}
            passwordVisible={passwordVisible}
            passwordRules={passwordRules}
            submitError={submitError}
            usernameRules={usernameRules}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F3F5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    width: 42,
    height: 20,
    justifyContent: 'center',
    marginLeft: 25,
  },
});

export default LoginScreen;
