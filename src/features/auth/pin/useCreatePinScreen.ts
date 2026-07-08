import {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import type {RootStackParamList} from '../../../navigation/types';
import {useAppDispatch} from '../../../store/hooks';
import {savePinCode} from '../storage/secureAuthStorage';
import {authUnlocked} from '../store/authSlice';

type CreatePinScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreatePin'
>;

const pinLength = 5;

function useCreatePinScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CreatePinScreenNavigationProp>();
  const {t} = useTranslation();
  const [confirmedPin, setConfirmedPin] = useState('');
  const [error, setError] = useState<string>();
  const [isSaving, setIsSaving] = useState(false);
  const [pin, setPin] = useState('');
  const [step, setStep] = useState<'create' | 'confirm'>('create');

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.replace('Welcome');
  }, [navigation]);

  const resetConfirmation = useCallback(() => {
    setConfirmedPin('');
    setError(undefined);
  }, []);

  const updateValue = useCallback(
    (updater: (value: string) => string) => {
      const setValue = step === 'create' ? setPin : setConfirmedPin;

      setValue(value => updater(value).slice(0, pinLength));

      if (error) {
        setError(undefined);
      }
    },
    [error, step],
  );

  const appendDigit = useCallback(
    (digit: string) => {
      updateValue(value =>
        value.length < pinLength ? `${value}${digit}` : value,
      );
    },
    [updateValue],
  );

  const removeDigit = useCallback(() => {
    updateValue(value => value.slice(0, -1));
  }, [updateValue]);

  const submitPin = useCallback(async () => {
    if (step === 'create') {
      if (pin.length < pinLength) {
        setError(t('auth.pinRequired', {count: pinLength}));
        return;
      }

      setStep('confirm');
      setConfirmedPin('');
      setError(undefined);
      return;
    }

    if (confirmedPin.length < pinLength) {
      setError(t('auth.pinConfirmRequired', {count: pinLength}));
      return;
    }

    if (confirmedPin !== pin) {
      setError(t('auth.pinMismatch'));
      setConfirmedPin('');
      return;
    }

    setIsSaving(true);

    try {
      await savePinCode(pin);
      dispatch(authUnlocked());
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch {
      setError(t('auth.pinSaveFailed'));
    } finally {
      setIsSaving(false);
    }
  }, [confirmedPin, dispatch, navigation, pin, step, t]);

  return {
    appendDigit,
    error,
    goBack,
    isSaving,
    pinLength,
    removeDigit,
    resetConfirmation,
    step,
    submitPin,
    value: step === 'create' ? pin : confirmedPin,
  };
}

export default useCreatePinScreen;
