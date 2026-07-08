import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import {BackIcon} from './sign-up/SignUpIcons';
import PinHeader from './pin/PinHeader';
import PinKeypad from './pin/PinKeypad';
import useCreatePinScreen from './pin/useCreatePinScreen';

function CreatePinScreen(): React.JSX.Element {
  const {
    appendDigit,
    error,
    goBack,
    isSaving,
    pinLength,
    removeDigit,
    step,
    submitPin,
    value,
  } = useCreatePinScreen();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Pressable
          accessibilityRole="button"
          hitSlop={14}
          onPress={goBack}
          style={styles.backButton}>
          <BackIcon />
        </Pressable>

        <PinHeader
          error={error}
          pinLength={pinLength}
          step={step}
          valueLength={value.length}
        />

        <PinKeypad onDelete={removeDigit} onDigitPress={appendDigit} />

        <View style={styles.footer}>
          <PrimaryButton
            disabled={isSaving}
            label={isSaving ? 'Saving...' : 'Continue'}
            onPress={submitPin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 17,
  },
  backButton: {
    width: 42,
    height: 26,
    justifyContent: 'center',
    marginTop: 10,
  },
  footer: {
    paddingBottom: 15,
  },
});

export default CreatePinScreen;
