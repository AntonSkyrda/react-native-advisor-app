import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  clearAuthStorage,
  getAuthSession,
  getPinWithBiometry,
  getSavedPinCode,
  getSupportedBiometryLabel,
  hasBiometricPin,
} from '../storage/secureAuthStorage';
import {authUnlocked, authUserChanged} from '../store/authSlice';
import type {RootStackParamList} from '../../../navigation/types';
import {useAppDispatch} from '../../../store/hooks';

type UnlockPinScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UnlockPin'
>;

const pinLength = 5;

function useUnlockPinScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UnlockPinScreenNavigationProp>();
  const [biometryLabel, setBiometryLabel] = useState<string | null>(null);
  const [hasSavedBiometry, setHasSavedBiometry] = useState(false);
  const [error, setError] = useState<string>();
  const [isChecking, setIsChecking] = useState(false);
  const [userLabel, setUserLabel] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    let isMounted = true;

    Promise.all([getSupportedBiometryLabel(), hasBiometricPin(), getAuthSession()])
      .then(([label, savedBiometry, session]) => {
        if (isMounted) {
          setBiometryLabel(label);
          setHasSavedBiometry(savedBiometry);
          setUserLabel(session?.email ?? session?.username ?? '');
        }
      })
      .catch(() => {
        if (isMounted) {
          setBiometryLabel(null);
          setHasSavedBiometry(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const unlockApp = useCallback(() => {
    dispatch(authUnlocked());
    navigation.reset({
      index: 0,
      routes: [{name: 'Success'}],
    });
  }, [dispatch, navigation]);

  const appendDigit = useCallback(
    (digit: string) => {
      setValue(current =>
        current.length < pinLength ? `${current}${digit}` : current,
      );

      if (error) {
        setError(undefined);
      }
    },
    [error],
  );

  const removeDigit = useCallback(() => {
    setValue(current => current.slice(0, -1));

    if (error) {
      setError(undefined);
    }
  }, [error]);

  const submitPin = useCallback(async () => {
    if (value.length < pinLength) {
      setError('Enter 5 digits');
      return;
    }

    setIsChecking(true);

    try {
      const savedPin = await getSavedPinCode();

      if (savedPin === value) {
        unlockApp();
        return;
      }

      setValue('');
      setError('Invalid PIN code');
    } catch {
      setError('Unable to verify PIN');
    } finally {
      setIsChecking(false);
    }
  }, [unlockApp, value]);

  const loginWithBiometry = useCallback(async () => {
    try {
      const pin = await getPinWithBiometry();

      if (pin) {
        unlockApp();
      }
    } catch {
      Alert.alert('Biometric login failed', 'Try again or use PIN code.');
    }
  }, [unlockApp]);

  const changeAccount = useCallback(async () => {
    await clearAuthStorage();
    dispatch(authUserChanged());
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  }, [dispatch, navigation]);

  return {
    appendDigit,
    biometryLabel,
    changeAccount,
    error,
    isBiometryAvailable: Boolean(biometryLabel && hasSavedBiometry),
    isChecking,
    loginWithBiometry,
    pinLength,
    removeDigit,
    submitPin,
    userLabel,
    value,
  };
}

export default useUnlockPinScreen;
