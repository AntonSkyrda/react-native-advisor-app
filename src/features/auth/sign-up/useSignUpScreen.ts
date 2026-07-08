import {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import type {RootStackParamList} from '../../../navigation/navigationTypes';
import {
  getEmailRules,
  getNameRules,
  getPasswordRules,
  signUpDefaultValues,
  type SignUpFormValues,
} from './signUpForm';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

function useSignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const {t} = useTranslation();
  const emailRules = getEmailRules(t);
  const nameRules = getNameRules(t);
  const passwordRules = getPasswordRules(t);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    control,
    formState: {errors, isValid},
    handleSubmit,
  } = useForm<SignUpFormValues>({
    defaultValues: signUpDefaultValues,
    mode: 'onChange',
  });

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.replace('Welcome');
  }, [navigation]);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible(value => !value);
  }, []);

  const submitForm = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.replace('Welcome');
  }, [navigation]);

  return {
    control,
    emailRules,
    errors,
    goBack,
    isValid,
    nameRules,
    passwordRules,
    passwordVisible,
    submitForm: handleSubmit(submitForm),
    togglePasswordVisibility,
  };
}

export default useSignUpScreen;
