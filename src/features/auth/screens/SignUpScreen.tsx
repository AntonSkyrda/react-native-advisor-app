import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import SignUpCard from '../sign-up/SignUpCard';
import SignUpContinueButton from '../sign-up/SignUpContinueButton';
import {BackIcon} from '../sign-up/SignUpIcons';
import useSignUpScreen from '../sign-up/useSignUpScreen';

function SignUpScreen(): React.JSX.Element {
  const {
    control,
    errors,
    goBack,
    isValid,
    passwordVisible,
    submitForm,
    togglePasswordVisibility,
  } = useSignUpScreen();

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

          <SignUpCard
            control={control}
            errors={errors}
            onTogglePassword={togglePasswordVisibility}
            passwordVisible={passwordVisible}
          />
        </ScrollView>

        <SignUpContinueButton
          disabled={!isValid}
          onPress={submitForm}
        />
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

export default SignUpScreen;
