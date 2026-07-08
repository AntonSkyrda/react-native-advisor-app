import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMutation} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {loginUser} from '../api/authApi';
import {
  getPinWithBiometry,
  getSupportedBiometryLabel,
  hasBiometricPin,
  saveAuthSession,
} from '../storage/secureAuthStorage';
import {authSessionDetected, authUnlocked} from '../store/authSlice';
import type {RootStackParamList} from '../../../navigation/types';
import {useAppDispatch} from '../../../store/hooks';
import {
  getLoginPasswordRules,
  getUsernameRules,
  loginDefaultValues,
  type LoginFormValues,
} from './loginForm';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

function useLoginScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {t} = useTranslation();
  const passwordRules = getLoginPasswordRules(t);
  const usernameRules = getUsernameRules(t);
  const [biometryLabel, setBiometryLabel] = useState<string | null>(null);
  const [hasPin, setHasPin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<LoginFormValues>({
    defaultValues: loginDefaultValues,
    mode: 'onChange',
  });
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async user => {
      await saveAuthSession(user);
      dispatch(authSessionDetected(true));
      navigation.navigate('CreatePin');
    },
  });

  useEffect(() => {
    let isMounted = true;

    async function loadBiometryState() {
      const [label, savedPin] = await Promise.all([
        getSupportedBiometryLabel(),
        hasBiometricPin(),
      ]);

      if (isMounted) {
        setBiometryLabel(label);
        setHasPin(savedPin);
      }
    }

    loadBiometryState().catch(() => {
      if (isMounted) {
        setBiometryLabel(null);
        setHasPin(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.replace('Welcome');
  }, [navigation]);

  const createAccount = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible(value => !value);
  }, []);

  const submitLogin = useCallback(
    async (values: LoginFormValues) => {
      loginMutation.mutate({
        username: values.username.trim(),
        password: values.password,
      });
    },
    [loginMutation],
  );

  const loginWithBiometry = useCallback(async () => {
    try {
      const pin = await getPinWithBiometry();

      if (pin) {
        dispatch(authUnlocked());
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    } catch {
      Alert.alert(
        t('auth.biometricLoginFailedTitle'),
        t('auth.biometricLoginFailedPasswordMessage'),
      );
    }
  }, [dispatch, navigation, t]);

  return {
    biometryLabel,
    control,
    createAccount,
    errors,
    goBack,
    isBiometryAvailable: Boolean(biometryLabel && hasPin),
    isLoading: loginMutation.isPending,
    loginWithBiometry,
    passwordVisible,
    passwordRules,
    submitError:
      loginMutation.error instanceof Error
        ? loginMutation.error.message
        : undefined,
    submitLogin: handleSubmit(submitLogin),
    togglePasswordVisibility,
    usernameRules,
  };
}

export default useLoginScreen;
