import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';

import type {RootStackParamList} from '../navigation/types';
import SignUpCard from './sign-up/SignUpCard';
import SignUpContinueButton from './sign-up/SignUpContinueButton';
import {BackIcon} from './sign-up/SignUpIcons';
import {
  signUpDefaultValues,
  type SignUpFormValues,
} from './sign-up/signUpForm';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

function SignUpScreen(): React.JSX.Element {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const {
    control,
    formState: {errors, isValid},
    handleSubmit,
  } = useForm<SignUpFormValues>({
    defaultValues: signUpDefaultValues,
    mode: 'onChange',
  });

  const submitForm = () => {
    navigation.goBack();
  };

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
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <BackIcon />
          </Pressable>

          <SignUpCard
            control={control}
            errors={errors}
            onTogglePassword={() => setPasswordVisible(value => !value)}
            passwordVisible={passwordVisible}
          />
        </ScrollView>

        <SignUpContinueButton
          disabled={!isValid}
          onPress={handleSubmit(submitForm)}
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
