import {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useForm} from 'react-hook-form';

import type {RootStackParamList} from '../../navigation/types';
import {signUpDefaultValues, type SignUpFormValues} from './signUpForm';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

function useSignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
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
    navigation.goBack();
  }, [navigation]);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible(value => !value);
  }, []);

  const submitForm = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    control,
    errors,
    goBack,
    isValid,
    passwordVisible,
    submitForm: handleSubmit(submitForm),
    togglePasswordVisibility,
  };
}

export default useSignUpScreen;
